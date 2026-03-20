/** @jest-environment node */
import SubscriberService, { SubscriberServices } from '../subscriber-service';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

jest.mock('../../base/db-connection', () => ({
  connect: jest.fn(),
}));

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => ({ toString: () => 'abc123token' })),
}));

const { connect } = jest.requireMock('../../base/db-connection') as { connect: jest.Mock };

const makeMockCollection = (overrides: Partial<Record<string, jest.Mock>> = {}) => ({
  findOne: jest.fn().mockResolvedValue(null),
  insertOne: jest.fn().mockResolvedValue({}),
  updateOne: jest.fn().mockResolvedValue({}),
  find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([]) }),
  ...overrides,
});

const makeMockDb = (collection: ReturnType<typeof makeMockCollection>) => ({
  db: { collection: jest.fn().mockReturnValue(collection) },
});

const makeServices = (): { services: SubscriberServices; sendMail: jest.Mock } => {
  const sendMail = jest.fn().mockResolvedValue({});
  return { services: { sendMail }, sendMail };
};

const makeApiEvent = (body: object, queryStringParameters?: Record<string, string>) =>
  ({
    body: JSON.stringify(body),
    queryStringParameters: queryStringParameters ?? null,
    requestContext: { identity: { sourceIp: '1.2.3.4' } },
  } as any);

global.fetch = jest.fn();

describe('SubscriberService.join', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    });
  });

  it('returns 400 when required fields are missing', async () => {
    const service = new SubscriberService(makeApiEvent({ name: 'Ada' }));
    const result = await service.join();
    expect(result.statusCode).toBe(400);
    expect(result.message).toMatch(/required/i);
  });

  it('returns 403 when Turnstile verification fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false }),
    });
    const collection = makeMockCollection();
    connect.mockResolvedValue(makeMockDb(collection));

    const service = new SubscriberService(
      makeApiEvent({ name: 'Ada', email: 'ada@example.com', turnstileToken: 'bad' })
    );
    const result = await service.join();
    expect(result.statusCode).toBe(403);
  });

  it('returns 200 and sends no new email when subscriber already exists', async () => {
    const collection = makeMockCollection({
      findOne: jest.fn().mockResolvedValue({ email: 'ada@example.com', confirmed: true }),
    });
    connect.mockResolvedValue(makeMockDb(collection));
    const { services, sendMail } = makeServices();

    const service = new SubscriberService(
      makeApiEvent({ name: 'Ada', email: 'ada@example.com', turnstileToken: 'tok' })
    );
    const result = await service.join(services);

    expect(result.statusCode).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('inserts subscriber and sends confirmation email on success', async () => {
    const collection = makeMockCollection();
    connect.mockResolvedValue(makeMockDb(collection));
    const { services, sendMail } = makeServices();

    const service = new SubscriberService(
      makeApiEvent({ name: 'Ada', email: 'ada@example.com', turnstileToken: 'tok' })
    );
    const result = await service.join(services);

    expect(result.statusCode).toBe(201);
    expect(collection.insertOne).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ada',
        email: 'ada@example.com',
        confirmed: false,
        confirm_token: 'abc123token',
        ip: '1.2.3.4',
      })
    );
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'ada@example.com',
        subject: expect.stringContaining('Confirm'),
      })
    );
  });
});

describe('SubscriberService.confirm', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns error when token or email is missing', async () => {
    const service = new SubscriberService(makeApiEvent({}, {}));
    const result = await service.confirm();
    expect(result.confirmed).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('returns error when subscriber not found', async () => {
    const collection = makeMockCollection({ findOne: jest.fn().mockResolvedValue(null) });
    connect.mockResolvedValue(makeMockDb(collection));

    const service = new SubscriberService(
      makeApiEvent({}, { token: 'abc123token', email: 'ada@example.com' })
    );
    const result = await service.confirm();
    expect(result.confirmed).toBe(false);
  });

  it('sets confirmed=true and removes token on valid confirm', async () => {
    const collection = makeMockCollection({
      findOne: jest.fn().mockResolvedValue({ email: 'ada@example.com', name: 'Ada', confirm_token: 'abc123token' }),
    });
    connect.mockResolvedValue(makeMockDb(collection));

    const service = new SubscriberService(
      makeApiEvent({}, { token: 'abc123token', email: 'ada@example.com' })
    );
    const result = await service.confirm();

    expect(result.confirmed).toBe(true);
    expect(result.name).toBe('Ada');
    expect(collection.updateOne).toHaveBeenCalledWith(
      { email: 'ada@example.com' },
      { $set: { confirmed: true }, $unset: { confirm_token: '' } }
    );
  });
});

describe('SubscriberService.notify', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 0 sent when no confirmed subscribers', async () => {
    const collection = makeMockCollection({
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([]) }),
    });
    connect.mockResolvedValue(makeMockDb(collection));
    const { services, sendMail } = makeServices();

    const service = new SubscriberService(
      makeApiEvent({ title: 'Test', url: 'https://example.com', description: 'Desc' })
    );
    const result = await service.notify(services);

    expect(result.sent).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('sends one mass email to all confirmed subscribers', async () => {
    const subscribers = [
      { name: 'Ada', email: 'ada@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ];
    const collection = makeMockCollection({
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue(subscribers) }),
    });
    connect.mockResolvedValue(makeMockDb(collection));
    const { services, sendMail } = makeServices();

    const service = new SubscriberService(
      makeApiEvent({ title: 'My Article', url: 'https://example.com/article', description: 'Great read' })
    );
    const result = await service.notify(services);

    expect(result.sent).toBe(2);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New Article: My Article',
        personalizations: expect.arrayContaining([
          expect.objectContaining({ to: [{ email: 'ada@example.com' }] }),
          expect.objectContaining({ to: [{ email: 'bob@example.com' }] }),
        ]),
      })
    );
  });

  it('sends only to testEmail when testEmail is provided', async () => {
    const subscribers = [
      { name: 'Ada', email: 'ada@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ];
    const collection = makeMockCollection({
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue(subscribers) }),
    });
    connect.mockResolvedValue(makeMockDb(collection));
    const { services, sendMail } = makeServices();

    const service = new SubscriberService(
      makeApiEvent({ title: 'My Article', url: 'https://example.com/article', description: 'Great read', testEmail: 'test@example.com' })
    );
    const result = await service.notify(services);

    expect(result.sent).toBe(1);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        personalizations: [expect.objectContaining({ to: [{ email: 'test@example.com' }] })],
      })
    );
  });
});
