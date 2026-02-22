/** @jest-environment node */
import ContactService from '../contact-service';

jest.mock('@aws-sdk/client-ses', () => {
  const sendMock = jest.fn();
  return {
    SESClient: jest.fn(() => ({ send: sendMock })),
    SendEmailCommand: jest.fn((params) => ({ params })),
    __getSendMock: () => sendMock,
  };
});

jest.mock('dotenv', () => ({ config: jest.fn() }));

const { __getSendMock } = jest.requireMock('@aws-sdk/client-ses') as {
  __getSendMock: () => jest.Mock;
};
const sesSendMock = __getSendMock();

const { SendEmailCommand } = jest.requireMock('@aws-sdk/client-ses') as {
  SendEmailCommand: jest.Mock;
};

const makeEvent = (body: object) =>
  ({ body: JSON.stringify(body) } as any);

describe('ContactService', () => {
  beforeEach(() => {
    sesSendMock.mockReset();
    SendEmailCommand.mockClear();
  });

  it('parses name, email, and message from the event body', () => {
    const service = new ContactService(
      makeEvent({ name: 'Ada', email: 'ada@example.com', message: 'Hello' })
    );
    expect((service as any).name).toBe('Ada');
    expect((service as any).email).toBe('ada@example.com');
    expect((service as any).message).toBe('Hello');
  });

  it('sends an SES email with the correct parameters', async () => {
    sesSendMock.mockResolvedValue({});
    const service = new ContactService(
      makeEvent({ name: 'Ada', email: 'ada@example.com', message: 'Hello there' })
    );

    await service.sendEmail();

    expect(SendEmailCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        Source: 'gitonganaeem@gmail.com',
        Destination: { ToAddresses: ['gitonganaeem@gmail.com'] },
        ReplyToAddresses: ['ada@example.com'],
        Message: expect.objectContaining({
          Subject: expect.objectContaining({ Data: 'Contact Form: Message from Ada' }),
          Body: expect.objectContaining({
            Text: expect.objectContaining({
              Data: expect.stringContaining('Hello there'),
            }),
          }),
        }),
      })
    );
    expect(sesSendMock).toHaveBeenCalledTimes(1);
  });

  it('includes name and email in the message body', async () => {
    sesSendMock.mockResolvedValue({});
    const service = new ContactService(
      makeEvent({ name: 'Ada', email: 'ada@example.com', message: 'Need help' })
    );

    await service.sendEmail();

    const [[callArg]] = SendEmailCommand.mock.calls;
    expect(callArg.Message.Body.Text.Data).toContain('Ada');
    expect(callArg.Message.Body.Text.Data).toContain('ada@example.com');
    expect(callArg.Message.Body.Text.Data).toContain('Need help');
  });

  it('propagates SES errors', async () => {
    sesSendMock.mockRejectedValue(new Error('SES failure'));
    const service = new ContactService(
      makeEvent({ name: 'Ada', email: 'ada@example.com', message: 'Hi' })
    );

    await expect(service.sendEmail()).rejects.toThrow('SES failure');
  });
});
