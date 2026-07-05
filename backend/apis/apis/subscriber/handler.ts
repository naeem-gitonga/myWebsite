import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { ServerErrors } from '../../declarations/enums';
import SubscriberService from './subscriber-service';
import response from '../base/response';
import { ValidationError } from '../base/base-service';

export const subscriber: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const service = new SubscriberService(event);
  let result: { message?: string; statusCode?: number; [key: string]: any };

  try {
    const whichMethod = service.mapRequestRouteToMethod() as keyof SubscriberService;
    result = await (service[whichMethod] as () => Promise<typeof result>)();
  } catch (e) {
    console.log(e);
    const err = e instanceof Error ? e : new Error(String(e));
    const statusCode = e instanceof ValidationError ? e.statusCode : 500;
    return response(ServerErrors.ItBroke, statusCode, err);
  }

  return response(result.message ?? result, result.statusCode ?? 200);
};