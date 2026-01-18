/** @jest-environment node */
import { ServerErrors, PaypalRoutes } from '../../../declarations/enums';
import PaypalService from '../paypal-service';


jest.mock('@aws-sdk/client-sqs', () => {
  const sendMock = jest.fn();
  return {
    SQSClient: jest.fn(() => ({ send: sendMock })),
    SendMessageCommand: jest.fn((params) => ({ params })),
    __getSendMock: () => sendMock,
  };
});

jest.mock('@aws-sdk/s3-request-presigner', () => {
  const presign = jest.fn();
  return {
    S3RequestPresigner: jest.fn(() => ({ presign })),
    __getPresignMock: () => presign,
  };
});

jest.mock('@aws-sdk/credential-providers', () => ({
  fromIni: jest.fn(() => ({ profile: 'default' })),
}));

jest.mock('@aws-sdk/util-format-url', () => ({
  formatUrl: jest.fn((obj) => obj.formatted),
}));

jest.mock('@smithy/url-parser', () => ({
  parseUrl: jest.fn((url) => ({ formatted: url })),
}));

jest.mock('@aws-sdk/hash-node', () => ({
  Hash: jest.fn(),
}));

jest.mock('@smithy/protocol-http', () => ({
  HttpRequest: jest.fn((params) => params),
}));

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

const createEvent = (body: unknown) =>
  ({ body: JSON.stringify(body), path: PaypalRoutes.order, httpMethod: 'POST' } as any);

const { fromIni } = jest.requireMock('@aws-sdk/credential-providers') as {
  fromIni: jest.Mock;
};
const { formatUrl } = jest.requireMock('@aws-sdk/util-format-url') as {
  formatUrl: jest.Mock;
};
const { parseUrl } = jest.requireMock('@smithy/url-parser') as {
  parseUrl: jest.Mock;
};
const { setApiKey: sendgridSetApiKeyMock, send: sendgridSendMock } = jest.requireMock('@sendgrid/mail') as {
  setApiKey: jest.Mock;
  send: jest.Mock;
};
const { __getSendMock } = jest.requireMock('@aws-sdk/client-sqs') as {
  __getSendMock: () => jest.Mock;
};
const sqsSendMock = __getSendMock();
const { __getPresignMock } = jest.requireMock('@aws-sdk/s3-request-presigner') as {
  __getPresignMock: () => jest.Mock;
};
const presignMock = __getPresignMock();

describe('PaypalService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SEND_GRID_API_KEY: 'test-key',
      WHICH_ROUTE: 'staging',
      DEAD_LETTER_QUEUE_URL: 'https://sqs.example.com/queue',
      CALENDLY_API_URL: 'https://calendly.example.com',
      CALENDLY_API_ACCESS_TOKEN: 'token',
      CALENDLY_EVENT_URI: 'event-uri',
      ACCESS_KEY_ID: 'access',
      SECRET_ACCESS_KEY: 'secret',
    };
    sendgridSendMock.mockReset();
    sendgridSetApiKeyMock.mockReset();
    presignMock.mockReset();
    sqsSendMock.mockReset();
    fromIni.mockReset();
    formatUrl.mockClear();
    parseUrl.mockClear();
    (global as any).fetch = jest.fn();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('sets api key and parses body in constructor', () => {
    const service = new PaypalService(createEvent({ id: 'order-1' }));

    expect(service.body.id).toBe('order-1');
    expect(sendgridSetApiKeyMock).toHaveBeenCalledWith('test-key');
  });

  it('builds urls for calendly, s3, and empty entries', async () => {
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        cart: [],
        address: { city: 'c', state: 's', zip: 'z' },
      })
    );

    presignMock.mockResolvedValue({ formatted: 'https://signed.example.com' });
    jest
      .spyOn(service, 'fetchCalendlySchedulingLink')
      .mockResolvedValue('https://calendly.example.com/book');

    const results = await service.createUrls('order-1', [
      {
        s3Url: '',
        emailTemplateHtml: "<p>No link: 'CODE'</p>",
        emailTemplateCode: 'CODE',
        calendlyLink: false,
      },
      {
        s3Url: 'https://bucket.example.com/file',
        emailTemplateHtml: "<p>S3: 'CODE'</p>",
        emailTemplateCode: 'CODE',
        calendlyLink: false,
      },
      {
        s3Url: '',
        emailTemplateHtml: "<p>Calendly: 'CAL'</p>",
        emailTemplateCode: 'CAL',
        calendlyLink: true,
      },
    ]);

    expect(results[0]).toContain("'CODE'");
    expect(results[1]).toContain('https://signed.example.com');
    expect(results[2]).toContain('https://calendly.example.com/book');
  });

  it('uses env credentials in production', async () => {
    process.env.NODE_ENV = 'production';
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        cart: [],
        address: { city: 'c', state: 's', zip: 'z' },
      })
    );

    presignMock.mockResolvedValue({ formatted: 'https://signed.example.com' });

    await service.createUrls('order-1', [
      {
        s3Url: 'https://bucket.example.com/file',
        emailTemplateHtml: "<p>S3: 'CODE'</p>",
        emailTemplateCode: 'CODE',
        calendlyLink: false,
      },
    ]);

    expect(fromIni).not.toHaveBeenCalled();
  });

  it('fetches calendly scheduling link', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        resource: { booking_url: 'https://calendly.example.com/link' },
      }),
    });
    const service = new PaypalService(createEvent({ id: 'order-1' }));

    const result = await service.fetchCalendlySchedulingLink();
    expect(result).toBe('https://calendly.example.com/link');
  });

  it('throws when calendly api fails', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({ ok: false });
    const service = new PaypalService(createEvent({ id: 'order-1' }));

    await expect(service.fetchCalendlySchedulingLink()).rejects.toThrow(
      ServerErrors.failedToMakeCalendlyLink
    );
  });

  it('sends email and records order', async () => {
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        firstName: 'Sam',
        lastName: 'Doe',
        email: 'sam@example.com',
        affiliateId: 'aff',
        address: { city: 'c', state: 's', zip: 'z' },
        cart: [
          {
            s3Url: 'https://bucket.example.com/file',
            emailTemplate: 'CODE',
            emailTemplateHtml: "<p>Link 'CODE'</p>",
            calendlyLink: false,
          },
        ],
      })
    );

    jest.spyOn(service, 'createUrls').mockResolvedValue(['<p>Link</p>']);
    const addOrderSpy = jest
      .spyOn(service, 'addOrder')
      .mockResolvedValue(undefined);
    sendgridSendMock.mockResolvedValue({ MessageId: 'msg-1' });

    const result = await service.sendEmail();

    expect(result.body).toBe('Email Sent!');
    expect(sendgridSendMock).toHaveBeenCalled();
    expect(addOrderSpy).toHaveBeenCalled();
  });

  it('throws when links cannot be created', async () => {
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        firstName: 'Sam',
        lastName: 'Doe',
        email: 'sam@example.com',
        affiliateId: 'aff',
        address: { city: 'c', state: 's', zip: 'z' },
        cart: [
          {
            s3Url: 'https://bucket.example.com/file',
            emailTemplate: 'CODE',
            emailTemplateHtml: "<p>Link 'CODE'</p>",
            calendlyLink: false,
          },
        ],
      })
    );

    jest.spyOn(service, 'createUrls').mockResolvedValue([]);
    const dlqSpy = jest
      .spyOn(service, 'sendToDeadLetterQueue')
      .mockResolvedValue(undefined);

    await expect(service.sendEmail()).rejects.toThrow(
      ServerErrors.failedToMakeLink
    );
    expect(dlqSpy).toHaveBeenCalledWith(
      service.event,
      ServerErrors.failedToMakeLink
    );
  });

  it('handles sendgrid failures by sending to dlq', async () => {
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        firstName: 'Sam',
        lastName: 'Doe',
        email: 'sam@example.com',
        affiliateId: 'aff',
        address: { city: 'c', state: 's', zip: 'z' },
        cart: [
          {
            s3Url: 'https://bucket.example.com/file',
            emailTemplate: 'CODE',
            emailTemplateHtml: "<p>Link 'CODE'</p>",
            calendlyLink: false,
          },
        ],
      })
    );

    jest.spyOn(service, 'createUrls').mockResolvedValue(['<p>Link</p>']);
    jest.spyOn(service, 'addOrder').mockResolvedValue(undefined);
    const dlqSpy = jest
      .spyOn(service, 'sendToDeadLetterQueue')
      .mockResolvedValue(undefined);
    sendgridSendMock.mockRejectedValue({ response: { body: 'send failed' } });

    await expect(service.sendEmail()).rejects.toThrow('Payment processed');
    expect(dlqSpy).toHaveBeenCalledWith(
      service.event,
      ServerErrors.failedToSendBook
    );
  });

  it('logs and continues when addOrder fails', async () => {
    const service = new PaypalService(
      createEvent({
        id: 'order-1',
        firstName: 'Sam',
        lastName: 'Doe',
        email: 'sam@example.com',
        affiliateId: 'aff',
        address: { city: 'c', state: 's', zip: 'z' },
        cart: [
          {
            s3Url: 'https://bucket.example.com/file',
            emailTemplate: 'CODE',
            emailTemplateHtml: "<p>Link 'CODE'</p>",
            calendlyLink: false,
          },
        ],
      })
    );

    jest.spyOn(service, 'createUrls').mockResolvedValue(['<p>Link</p>']);
    jest.spyOn(service, 'addOrder').mockRejectedValue(new Error('db error'));
    const dlqSpy = jest
      .spyOn(service, 'sendToDeadLetterQueue')
      .mockResolvedValue(undefined);
    sendgridSendMock.mockResolvedValue({ MessageId: 'msg-1' });

    const result = await service.sendEmail();

    expect(result.body).toBe('Email Sent!');
    expect(dlqSpy).toHaveBeenCalledWith(
      service.event,
      ServerErrors.failedToSaveToDB
    );
  });

  it('throws when sending to the dead letter queue fails', async () => {
    const service = new PaypalService(createEvent({ id: 'order-1' }));
    sqsSendMock.mockRejectedValue(new Error('sqs down'));

    await expect(
      service.sendToDeadLetterQueue(service.event, 'Title')
    ).rejects.toThrow(ServerErrors.ItBroke);
  });
});
