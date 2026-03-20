import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { ServerErrors } from '../../declarations/enums';
import SubscriberService from './subscriber-service';
import response from '../base/response';

export const subscriber: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const service = new SubscriberService(event);
  let result: { message?: string; statusCode?: number; [key: string]: any };

  try {
    const whichMethod = service.mapRequestRouteToMethod();
    result = await service[whichMethod]();
  } catch (e) {
    console.log(e);
    return response(ServerErrors.ItBroke, 500, e);
  }

  return response(result.message ?? result, result.statusCode ?? 200);
};
