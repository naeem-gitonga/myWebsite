import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { ServerErrors } from '../../declarations/enums';
import PaypalService from './paypal-service';
import response from '../base/response';
import UserService from '../user/user-service';
import { SendEmailResult } from '@declarations/order';
import { ValidationError } from '../base/base-service';

export const paypal: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const paypalService = new PaypalService(event);
  let paypalResponse: SendEmailResult;
  try {
    const whichMethod = paypalService.mapRequestRouteToMethod() as keyof PaypalService;
    paypalResponse = await (paypalService[whichMethod] as () => Promise<SendEmailResult>)();
  } catch (e) {
    console.log(e);
    const err = e instanceof Error ? e : new Error(String(e));
    const statusCode = e instanceof ValidationError ? e.statusCode : 500;
    return response(ServerErrors.ItBroke, statusCode, err);
  }

  try {
    const userService = new UserService(event);
    const { user } = paypalResponse;
    userService.createUser(user);
  } catch (e) {
    console.log(e);
  }

  const { body, headers, multiValueHeaders } = paypalResponse;
  return response(body, 200, undefined, headers, multiValueHeaders);
};
