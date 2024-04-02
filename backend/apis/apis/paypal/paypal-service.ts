import { APIGatewayEvent, APIGatewayProxyEvent } from 'aws-lambda';
import { ObjectId } from 'bson';
import { config } from 'dotenv';

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { formatUrl } from '@aws-sdk/util-format-url';
import { Hash } from '@aws-sdk/hash-node';
import sendgrid from '@sendgrid/mail';

import BaseService from '../base/base-service';
import { customerTemplate } from './email-templates/customer-template';
import { PaypalRoutes, ServerErrors } from '../../declarations/enums';
import { Order, SendEmailResult, User } from '@declarations/order';
import { RouteMap } from '@declarations/routing';
import CartItem from '@root/types/cart-item';

config();
const configuration = { region: 'us-east-1' };
const sqs = new SQSClient(configuration);

export default class PaypalService extends BaseService<Order> {
  /**
   * Route Maps are a building block of routing in Rapid Back-End. Hashmaps of RESTful verbs make key/value pairs of more maps whose
   * key/value pairs are methodNames/route parameters. Each route parameter
   * is defined in an enum to help prevent "magic strings". Notice below that
   * each method on this class has a corresponding key under one of the
   * RESTful verbs. This is how the actual mapping is made possible.
   */
  private static routeMap: RouteMap = {
    POST: {
      sendEmail:
        process.env.WHICH_ROUTE === 'staging'
          ? PaypalRoutes.orderstaging
          : PaypalRoutes.order,
    },
  };

  public body: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    affiliateId: string;
    address: {
      city: string;
      state: string;
      zip: string;
    };
    cart: CartItem[];
  };

  public event: APIGatewayEvent;
  private senderEmailAddress = 'gtngbooks@gmail.com';

  constructor(event: APIGatewayProxyEvent) {
    super(event, PaypalService.routeMap);
    this.body = JSON.parse(event.body);
    this.event = event;
    sendgrid.setApiKey(process.env.SEND_GRID_API_KEY as string);
  }

  async sendEmail(): Promise<SendEmailResult> {
    let links = [];
    const {
      email,
      firstName,
      lastName,
      id: orderId,
      affiliateId,
      address,
      cart,
    } = this.body;
    let urlObjs = [];
    const codes = cart.map((i) => {
      urlObjs = [
        ...urlObjs,
        {
          s3Url: i.s3Url,
          emailTemplateCode: i.emailTemplate,
          emailTemplateHtml: i.emailTemplateHtml,
          calendlyLink: i.calendlyLink,
        },
      ];
      return i.emailTemplate;
    });

    try {
      links = await this.createUrls(orderId, urlObjs);
    } catch (e) {
      console.log('SIGNING URL ', e);
    }

    if (urlObjs.length !== links.length) {
      await this.sendToDeadLetterQueue(
        this.event,
        ServerErrors.failedToMakeLink
      );
      throw new Error(ServerErrors.failedToMakeLink);
    }

    const user: User = {
      _id: new ObjectId(),
      firstName,
      lastName,
      email,
      city: address.city,
      state: address.state,
      zip: address.zip,
      affiliateId,
    };
    let emailSendResult;

    try {
      emailSendResult = await sendgrid.send({
        to:
          process.env.WHICH_ROUTE === 'production'
            ? email
            : 'jngincorporated@gmail.com',
        from: this.senderEmailAddress,
        subject: `Naeem Gitonga - Order ${orderId}`,
        html: customerTemplate(links, orderId, firstName),
      });

      console.log('Email sent successfully!');
    } catch (e) {
      console.log(`${ServerErrors.failedToSendBook} for order ${orderId}`, e);

      await this.addOrder(orderId, user, null, links, false);
      this.sendToDeadLetterQueue(this.event, ServerErrors.failedToSendBook);

      throw new Error(`
        Payment processed but we failed to send your eBook! 
        Please contact support at ${this.senderEmailAddress} and 
        provide this orderId: ${orderId}`);
    }

    try {
      // * add order to your own record
      // TODO: fix this as it is not adding to the correct document if it is adding anything at all
      await this.addOrder(
        orderId,
        user,
        emailSendResult.MessageId,
        links,
        true
      );
    } catch (e) {
      this.sendToDeadLetterQueue(this.event, ServerErrors.failedToSaveToDB);
      console.log(ServerErrors.failedToSaveToDB);
      console.log(e);
    }

    return {
      body: 'Email Sent!',
      user: user,
      headers: {},
      multiValueHeaders: {},
    };
  }

  async addOrder(
    orderId: string,
    user: any,
    emailMessageId: string | null,
    link: any,
    sent: boolean
  ) {
    await this.create({
      Bucket: 'gtng',
      Key: `${
        process.env.NODE_ENV === 'staging' ? 'development-' : ''
      }orders/${user._id}.json`,
      Body: JSON.stringify({
        ...user,
        userId: user._id,
        orderId,
        paid: true,
        link,
        sent,
        emailMessageId,
      }),
    });
  }

  async sendToDeadLetterQueue(
    event: APIGatewayEvent,
    title: string
  ): Promise<void> {
    const message = JSON.stringify(event);
    const command = new SendMessageCommand({
      QueueUrl: process.env.DEAD_LETTER_QUEUE_URL as string,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: title,
        },
      },
      MessageBody: message,
    });

    try {
      await sqs.send(command);
    } catch (e) {
      console.log('DEAD LETTER QUEUE ERROR', e);
      // console.log('Message dropped: ', title, event);
      throw new Error(ServerErrors.ItBroke);
    }
  }

  async createUrls(
    orderId: string,
    urls: {
      s3Url: string;
      emailTemplateHtml: string;
      emailTemplateCode: string;
      calendlyLink: boolean;
    }[]
  ): Promise<string[]> {
    const urlPromises = urls.map(async (urlObj) => {
      if (urlObj.calendlyLink === true) {
        const link = await this.fetchCalendlySchedulingLink();
        const url = parseUrl(link);
        urlObj.emailTemplateHtml = urlObj.emailTemplateHtml.replace(
          `'${urlObj.emailTemplateCode}'`,
          formatUrl(url)
        );
        return urlObj.emailTemplateHtml;
      }

      if (urlObj.s3Url !== '') {
        const url = parseUrl(urlObj.s3Url);

        // * I worked all day on this. the fromIni() only works locally, and My syntax was off for the credentials (wasn't camel casing the key names was using ACCESS_KEY_ID instead)
        const presigner = new S3RequestPresigner({
          credentials:
            process.env.NODE_ENV === 'production' ||
            process.env.NODE_ENV === 'staging'
              ? {
                  accessKeyId: process.env.ACCESS_KEY_ID,
                  secretAccessKey: process.env.SECRET_ACCESS_KEY,
                }
              : fromIni(),
          region: 'us-east-1',
          sha256: Hash.bind(null, 'sha256'),
        });
        const signedUrlObject = await presigner.presign(
          new HttpRequest({ ...url, method: 'GET', query: { orderId } }),
          { expiresIn: 259200 }
        );

        urlObj.emailTemplateHtml = urlObj.emailTemplateHtml.replace(
          `'${urlObj.emailTemplateCode}'`,
          formatUrl(signedUrlObject)
        );
      }

      return urlObj.emailTemplateHtml;
    });

    const signedUrls = await Promise.all(urlPromises);
    return signedUrls;
  }

  async fetchCalendlySchedulingLink(): Promise<string> {
    const response = await fetch(
      `${process.env.CALENDLY_API_URL as string}/scheduling_links`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_event_count: 1,
          owner: process.env.CALENDLY_EVENT_URI,
          owner_type: 'EventType',
        }),
      }
    );

    if (!response.ok) {
      console.log('SEE RESPONSE', response);
      throw new Error(ServerErrors.failedToMakeCalendlyLink);
    }
    const json = await response.json();
    return json.resource.booking_url;
  }
}
