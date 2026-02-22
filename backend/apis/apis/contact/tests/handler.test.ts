/** @jest-environment node */
import { ServerErrors } from '../../../declarations/enums';
import { contact } from '../handler';
import response from '../../base/response';
import ContactService from '../contact-service';

jest.mock('../contact-service');
jest.mock('../../base/response');

const ContactServiceMock = ContactService as jest.MockedClass<typeof ContactService>;
const responseMock = response as jest.Mock;

describe('contact handler', () => {
  const event = { path: '/api/jngcontact', httpMethod: 'POST', body: '{}' } as any;
  const context = { callbackWaitsForEmptyEventLoop: true } as any;

  beforeEach(() => {
    ContactServiceMock.mockReset();
    responseMock.mockReset();
  });

  it('returns a 200 response when email sends successfully', async () => {
    const sendEmail = jest.fn().mockResolvedValue(undefined);
    ContactServiceMock.mockImplementation(() => ({ sendEmail }) as any);
    responseMock.mockReturnValue({ statusCode: 200 });

    const result = await contact(event, context, jest.fn());

    expect(context.callbackWaitsForEmptyEventLoop).toBe(false);
    expect(sendEmail).toHaveBeenCalled();
    expect(responseMock).toHaveBeenCalledWith('Message sent!', 200);
    expect(result).toEqual({ statusCode: 200 });
  });

  it('returns a 500 response when sendEmail throws', async () => {
    const err = new Error('ses down');
    ContactServiceMock.mockImplementation(() => ({
      sendEmail: jest.fn().mockRejectedValue(err),
    }) as any);
    responseMock.mockReturnValue({ statusCode: 500 });

    const result = await contact(event, context, jest.fn());

    expect(responseMock).toHaveBeenCalledWith(ServerErrors.ItBroke, 500, err);
    expect(result).toEqual({ statusCode: 500 });
  });
});
