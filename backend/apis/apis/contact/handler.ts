import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { ServerErrors } from '../../declarations/enums';
import ContactService from './contact-service';
import response from '../base/response';
import { ValidationError } from '../base/base-service';

export const contact: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const contactService = new ContactService(event);
  try {
    await contactService.sendEmail();
  } catch (e) {
    console.log(e);
    const err = e instanceof Error ? e : new Error(String(e));
    const statusCode = e instanceof ValidationError ? e.statusCode : 500;
    return response(ServerErrors.ItBroke, statusCode, err);
  }
  return response('Message sent!', 200);
};
