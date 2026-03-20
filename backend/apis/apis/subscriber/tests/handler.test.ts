/** @jest-environment node */
import { ServerErrors } from '../../../declarations/enums';
import { subscriber } from '../handler';
import response from '../../base/response';
import SubscriberService from '../subscriber-service';

jest.mock('../subscriber-service');
jest.mock('../../base/response');

const SubscriberServiceMock = SubscriberService as jest.MockedClass<typeof SubscriberService>;
const responseMock = response as jest.Mock;

const makeApiEvent = (path: string) =>
  ({ path, httpMethod: 'POST', body: '{}', queryStringParameters: null } as any);
const context = { callbackWaitsForEmptyEventLoop: true } as any;

describe('subscriber handler — API Gateway', () => {
  beforeEach(() => {
    SubscriberServiceMock.mockReset();
    responseMock.mockReset();
  });

  it('routes /join to service.join and returns 201', async () => {
    const join = jest.fn().mockResolvedValue({ message: 'Check your email for a confirmation link.', statusCode: 201 });
    SubscriberServiceMock.mockImplementation(() => ({ join, confirm: jest.fn(), notify: jest.fn() } as any));
    responseMock.mockReturnValue({ statusCode: 201 });

    await subscriber(makeApiEvent('/api/ngsubscriber/join'), context);

    expect(join).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith('Check your email for a confirmation link.', 201);
  });

  it('routes /confirm to service.confirm', async () => {
    const confirm = jest.fn().mockResolvedValue({ confirmed: true, name: 'Ada' });
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm, notify: jest.fn() } as any));
    responseMock.mockReturnValue({ statusCode: 200 });

    await subscriber({ ...makeApiEvent('/api/ngsubscriber/confirm'), httpMethod: 'GET' }, context);

    expect(confirm).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith({ confirmed: true, name: 'Ada' }, 200);
  });

  it('returns 404 for unknown paths', async () => {
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm: jest.fn(), notify: jest.fn() } as any));
    responseMock.mockReturnValue({ statusCode: 404 });

    await subscriber(makeApiEvent('/api/ngsubscriber/unknown'), context);

    expect(responseMock).toHaveBeenCalledWith('Not found', 404);
  });

  it('returns 500 when service throws', async () => {
    const err = new Error('db down');
    SubscriberServiceMock.mockImplementation(() => ({
      join: jest.fn().mockRejectedValue(err),
      confirm: jest.fn(),
      notify: jest.fn(),
    } as any));
    responseMock.mockReturnValue({ statusCode: 500 });

    await subscriber(makeApiEvent('/api/ngsubscriber/join'), context);

    expect(responseMock).toHaveBeenCalledWith(ServerErrors.ItBroke, 500, err);
  });
});

describe('subscriber handler — direct Lambda invocation', () => {
  beforeEach(() => {
    SubscriberServiceMock.mockReset();
    responseMock.mockReset();
  });

  it('routes notify action to service.notify', async () => {
    const notify = jest.fn().mockResolvedValue({ message: 'Notifications sent', sent: 3 });
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm: jest.fn(), notify } as any));
    responseMock.mockReturnValue({ statusCode: 200 });

    const directEvent = { action: 'notify', title: 'My Article', url: 'https://example.com', description: 'Desc' };
    await subscriber(directEvent as any, context);

    expect(notify).toHaveBeenCalledWith(directEvent);
    expect(responseMock).toHaveBeenCalledWith({ message: 'Notifications sent', sent: 3 }, 200);
  });

  it('returns 500 when notify throws', async () => {
    const err = new Error('sendgrid down');
    SubscriberServiceMock.mockImplementation(() => ({
      join: jest.fn(),
      confirm: jest.fn(),
      notify: jest.fn().mockRejectedValue(err),
    } as any));
    responseMock.mockReturnValue({ statusCode: 500 });

    await subscriber({ action: 'notify', title: 'T', url: 'U', description: 'D' } as any, context);

    expect(responseMock).toHaveBeenCalledWith(ServerErrors.ItBroke, 500, err);
  });
});
