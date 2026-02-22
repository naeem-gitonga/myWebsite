import { APIGatewayProxyEvent } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { config } from 'dotenv';

config();

const ses = new SESClient({ region: 'us-east-1' });

export default class ContactService {
  private name: string;
  private email: string;
  private message: string;
  private readonly recipientEmail = 'gitonganaeem@gmail.com';

  constructor(event: APIGatewayProxyEvent) {
    const body = JSON.parse(event.body);
    this.name = body.name;
    this.email = body.email;
    this.message = body.message;
  }

  async sendEmail(): Promise<void> {
    const command = new SendEmailCommand({
      Source: this.recipientEmail,
      Destination: {
        ToAddresses: [this.recipientEmail],
      },
      Message: {
        Subject: {
          Data: `Contact Form: Message from ${this.name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `Name: ${this.name}\nEmail: ${this.email}\n\nMessage:\n${this.message}`,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [this.email],
    });

    await ses.send(command);
  }
}
