import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { ServerErrors } from '../../declarations/enums';
import ContactService from './contact-service';
import response from '../base/response';

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
    return response(ServerErrors.ItBroke, 500, e);
  }
  return response('Message sent!', 200);
};
