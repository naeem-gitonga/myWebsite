/** @jest-environment node */
import { ServerErrors } from '../../../declarations/enums';
import { paypal } from '../handler';
import response from '../../base/response';
import PaypalService from '../paypal-service';
import UserService from '../../user/user-service';

jest.mock('../paypal-service');
jest.mock('../../user/user-service');
jest.mock('../../base/response');

const PaypalServiceMock = PaypalService as jest.MockedClass<
  typeof PaypalService
>;
const UserServiceMock = UserService as jest.MockedClass<typeof UserService>;
const responseMock = response as jest.Mock;

describe('paypal handler', () => {
  const event = { path: '/api/jngpaypal/order', httpMethod: 'POST' } as any;
  const context = { callbackWaitsForEmptyEventLoop: true } as any;

  beforeEach(() => {
    PaypalServiceMock.mockReset();
    UserServiceMock.mockReset();
    responseMock.mockReset();
  });

  it('returns a 200 response for successful processing', async () => {
    const sendEmail = jest.fn().mockResolvedValue({
      body: 'ok',
      user: { id: 'user-1' },
      headers: { 'X-Test': 'yes' },
      multiValueHeaders: { 'Set-Cookie': ['a'] },
    });
    PaypalServiceMock.mockImplementation(() => ({
      mapRequestRouteToMethod: jest.fn(() => 'sendEmail'),
      sendEmail,
    }) as any);
    UserServiceMock.mockImplementation(() => ({
      createUser: jest.fn(),
    }) as any);
    responseMock.mockReturnValue({ statusCode: 200 });

    const result = await paypal(event, context);

    expect(context.callbackWaitsForEmptyEventLoop).toBe(false);
    expect(sendEmail).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith(
      'ok',
      200,
      undefined,
      { 'X-Test': 'yes' },
      { 'Set-Cookie': ['a'] }
    );
    expect(result).toEqual({ statusCode: 200 });
  });

  it('returns a 500 response when the service throws', async () => {
    PaypalServiceMock.mockImplementation(() => ({
      mapRequestRouteToMethod: jest.fn(() => {
        throw new Error('boom');
      }),
    }) as any);
    responseMock.mockReturnValue({ statusCode: 500 });

    const result = await paypal(event, context);

    expect(responseMock).toHaveBeenCalledWith(
      ServerErrors.ItBroke,
      500,
      expect.any(Error)
    );
    expect(result).toEqual({ statusCode: 500 });
  });

  it('ignores user service failures', async () => {
    const sendEmail = jest.fn().mockResolvedValue({
      body: 'ok',
      user: { id: 'user-1' },
      headers: {},
      multiValueHeaders: {},
    });
    PaypalServiceMock.mockImplementation(() => ({
      mapRequestRouteToMethod: jest.fn(() => 'sendEmail'),
      sendEmail,
    }) as any);
    UserServiceMock.mockImplementation(() => ({
      createUser: jest.fn(() => {
        throw new Error('user fail');
      }),
    }) as any);
    responseMock.mockReturnValue({ statusCode: 200 });

    const result = await paypal(event, context);

    expect(result).toEqual({ statusCode: 200 });
  });
});
