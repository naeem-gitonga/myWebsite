import sgMail from '@sendgrid/mail';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { randomBytes } from 'crypto';
import { connect } from '../base/db-connection';
import { confirmationTemplate } from './email-templates/confirmation';
import { newArticleTemplate } from './email-templates/new-article';
import BaseService from '../base/base-service';
import { SubscriberRoutes } from '../../declarations/enums';
import { RouteMap } from '@declarations/routing';

const FROM_EMAIL = 'subscriber@naeemgitonga.com';

export interface Subscriber {
  name: string;
  email: string;
  subscribed_at: string;
  ip: string;
  confirmed: boolean;
  confirm_token?: string;
  analytics_user_id?: string | null;
}

export interface NotifyPayload {
  title: string;
  url: string;
  description: string;
  testEmail?: string;
}

export interface SubscriberServices {
  sendMail: (data: sgMail.MailDataRequired | sgMail.MailDataRequired[]) => Promise<any>;
}

function initSendGrid(): void {
  const apiKey = process.env.SEND_GRID_API_KEY;
  if (apiKey) {
    sgMail.setApiKey(apiKey);
  }
}

initSendGrid();

const defaultServices: SubscriberServices = {
  sendMail: sgMail.send.bind(sgMail),
};

export default class SubscriberService extends BaseService<Subscriber> {
  private static routeMap: RouteMap = {
    POST: {
      join: process.env.WHICH_ROUTE === 'staging'
        ? SubscriberRoutes.joinstaging
        : SubscriberRoutes.join,
      notify: process.env.WHICH_ROUTE === 'staging'
        ? SubscriberRoutes.notifystaging
        : SubscriberRoutes.notify,
    },
    GET: {
      confirm: process.env.WHICH_ROUTE === 'staging'
        ? SubscriberRoutes.confirmstaging
        : SubscriberRoutes.confirm,
      status: process.env.WHICH_ROUTE === 'staging'
        ? SubscriberRoutes.statusstaging
        : SubscriberRoutes.status,
    },
  };

  private event: APIGatewayProxyEvent;

  constructor(event: APIGatewayProxyEvent) {
    super(event, SubscriberService.routeMap);
    this.event = event;
  }

  async join(
    services: SubscriberServices = defaultServices
  ): Promise<{ message: string; statusCode: number }> {
    const body = JSON.parse(this.event.body || '{}');
    const { name, email, turnstileToken, analyticsUserId } = body;

    if (!name || !email || !turnstileToken) {
      return { message: 'name, email, and turnstileToken are required', statusCode: 400 };
    }

    const verified = await this.verifyTurnstile(turnstileToken);
    if (!verified) {
      return { message: 'CAPTCHA verification failed', statusCode: 403 };
    }

    const ip = this.event.requestContext?.identity?.sourceIp || 'unknown';
    const { db } = await connect();
    const collection = db.collection<Subscriber>('subscribers');

    const existing = await collection.findOne({ email });
    if (existing) {
      return { message: 'Check your email for a confirmation link.', statusCode: 200 };
    }

    const confirmToken = randomBytes(32).toString('hex');

    await collection.insertOne({
      name,
      email,
      subscribed_at: new Date().toISOString(),
      ip,
      confirmed: false,
      confirm_token: confirmToken,
      analytics_user_id: analyticsUserId ?? null,
    });

    const origin = process.env.ORIGIN;
    const confirmUrl = `${origin}/api/subscriber/confirm?email=${encodeURIComponent(email)}&token=${confirmToken}&fromWebsite=email-subscription-${encodeURIComponent(name)}`;
    const html = confirmationTemplate(name, confirmUrl, origin);

    await services.sendMail({
      to: email,
      from: FROM_EMAIL,
      subject: 'Confirm your subscription to Naeem Gitonga',
      html,
    });

    return { message: 'Check your email for a confirmation link.', statusCode: 201 };
  }

  async confirm(): Promise<{ confirmed: boolean; name?: string; error?: string }> {
    const { token, email } = this.event.queryStringParameters || {};

    if (!token || !email) {
      return { confirmed: false, error: 'Invalid confirmation link.' };
    }

    const { db } = await connect();
    const collection = db.collection<Subscriber>('subscribers');

    const subscriber = await collection.findOne({ email, confirm_token: token });
    if (!subscriber) {
      return { confirmed: false, error: 'This link is invalid or has already been used.' };
    }

    await collection.updateOne(
      { email },
      { $set: { confirmed: true }, $unset: { confirm_token: '' } }
    );

    return { confirmed: true, name: subscriber.name };
  }

  async notify(
    services: SubscriberServices = defaultServices
  ): Promise<{ sent: number }> {
    const { title, url, description, testEmail } = JSON.parse(this.event.body || '{}') as NotifyPayload;

    const { db } = await connect();
    const collection = db.collection<Subscriber>('subscribers');
    const allSubscribers = await collection.find({ confirmed: true }).toArray();

    // If testEmail is provided, only send to that address regardless of subscriber list
    const subscribers = testEmail
      ? [{ name: 'Test', email: testEmail }]
      : allSubscribers;

    if (subscribers.length === 0) {
      return { sent: 0 };
    }

    const html = newArticleTemplate(title, url, description);

    await services.sendMail({
      from: FROM_EMAIL,
      subject: `New Article: ${title}`,
      html,
      substitutionWrappers: ['{{', '}}'],
      personalizations: subscribers.map(({ name, email }) => ({
        to: [{ email }],
        substitutions: { name, email },
      })),
    } as sgMail.MailDataRequired);

    return { sent: subscribers.length };
  }

  async status(): Promise<{ state: 'confirmed' | 'pending' | 'not_found' }> {
    const { analyticsUserId } = this.event.queryStringParameters || {};

    if (!analyticsUserId) {
      return { state: 'not_found' };
    }

    const { db } = await connect();
    const collection = db.collection<Subscriber>('subscribers');
    const subscriber = await collection.findOne({ analytics_user_id: analyticsUserId });

    if (!subscriber) return { state: 'not_found' };
    if (subscriber.confirmed) return { state: 'confirmed' };
    return { state: 'pending' };
  }

  private async verifyTurnstile(token: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    });
    const data: { success: boolean } = await res.json();
    return data.success === true;
  }
}
