/** @jest-environment node */
import {
  ServerErrors,
  Collections,
  HttpMethods,
  LambdaBRoutes,
  PaypalRoutes,
} from '../enums';

describe('enums', () => {
  it('exposes expected values', () => {
    expect(ServerErrors.ItBroke).toBe('Something broke');
    expect(Collections.Users).toBe('users');
    expect(HttpMethods.Post).toBe('POST');
    expect(LambdaBRoutes.updateRoute).toContain('/case/{caseId}');
    expect(PaypalRoutes.orderstaging).toContain('jngpaypal-staging');
  });
});
