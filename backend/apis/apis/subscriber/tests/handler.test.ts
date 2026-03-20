/** @jest-environment node */
import { ServerErrors } from '../../../declarations/enums';
import { subscriber } from '../handler';
import response from '../../base/response';
import SubscriberService from '../subscriber-service';

jest.mock('../subscriber-service');
jest.mock('../../base/response');

const SubscriberServiceMock = SubscriberService as jest.MockedClass<typeof SubscriberService>;
const responseMock = response as jest.Mock;

const makeApiEvent = (path: string, httpMethod = 'POST') =>
  ({ path, httpMethod, body: '{}', queryStringParameters: null } as any);
const context = { callbackWaitsForEmptyEventLoop: true } as any;
const callback = jest.fn();

describe('subscriber handler', () => {
  beforeEach(() => {
    SubscriberServiceMock.mockReset();
    responseMock.mockReset();
  });

  it('routes /join to service.join and returns 201', async () => {
    const join = jest.fn().mockResolvedValue({ message: 'Check your email for a confirmation link.', statusCode: 201 });
    SubscriberServiceMock.mockImplementation(() => ({ join, confirm: jest.fn(), notify: jest.fn(), status: jest.fn(), mapRequestRouteToMethod: jest.fn().mockReturnValue('join') } as any));
    responseMock.mockReturnValue({ statusCode: 201 });

    await subscriber(makeApiEvent('/api/ngsubscriber/join'), context, callback);

    expect(join).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith('Check your email for a confirmation link.', 201);
  });

  it('routes /confirm to service.confirm', async () => {
    const confirm = jest.fn().mockResolvedValue({ confirmed: true, name: 'Ada' });
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm, notify: jest.fn(), status: jest.fn(), mapRequestRouteToMethod: jest.fn().mockReturnValue('confirm') } as any));
    responseMock.mockReturnValue({ statusCode: 200 });

    await subscriber(makeApiEvent('/api/ngsubscriber/confirm', 'GET'), context, callback);

    expect(confirm).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith({ confirmed: true, name: 'Ada' }, 200);
  });

  it('routes /notify to service.notify', async () => {
    const notify = jest.fn().mockResolvedValue({ message: 'Notifications sent', sent: 3 });
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm: jest.fn(), notify, status: jest.fn(), mapRequestRouteToMethod: jest.fn().mockReturnValue('notify') } as any));
    responseMock.mockReturnValue({ statusCode: 200 });

    await subscriber(makeApiEvent('/api/ngsubscriber/notify'), context, callback);

    expect(notify).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith('Notifications sent', 200);
  });

  it('routes /status to service.status', async () => {
    const status = jest.fn().mockResolvedValue({ state: 'confirmed' });
    SubscriberServiceMock.mockImplementation(() => ({ join: jest.fn(), confirm: jest.fn(), notify: jest.fn(), status, mapRequestRouteToMethod: jest.fn().mockReturnValue('status') } as any));
    responseMock.mockReturnValue({ statusCode: 200 });

    await subscriber(makeApiEvent('/api/ngsubscriber/status', 'GET'), context, callback);

    expect(status).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith({ state: 'confirmed' }, 200);
  });

  it('returns 500 when service throws', async () => {
    const err = new Error('db down');
    SubscriberServiceMock.mockImplementation(() => ({
      join: jest.fn().mockRejectedValue(err),
      confirm: jest.fn(),
      notify: jest.fn(),
      status: jest.fn(),
      mapRequestRouteToMethod: jest.fn().mockReturnValue('join'),
    } as any));
    responseMock.mockReturnValue({ statusCode: 500 });

    await subscriber(makeApiEvent('/api/ngsubscriber/join'), context, callback);

    expect(responseMock).toHaveBeenCalledWith(ServerErrors.ItBroke, 500, err);
  });
});
