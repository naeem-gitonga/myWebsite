/** @jest-environment node */
jest.mock('aws-cdk-lib', () => ({
  App: jest.fn(() => ({ app: true })),
}));

jest.mock('../../lib/backend-stack', () => jest.fn());

describe('cdk entrypoint', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('uses staging suffix when not production', () => {
    process.env.NODE_ENV = 'staging';
    const BackendStack = require('../../lib/backend-stack') as jest.Mock;
    BackendStack.mockClear();
    require('../cdk');

    expect(BackendStack).toHaveBeenCalledWith(
      expect.anything(),
      'NG-Backend-Paypal-staging',
      expect.any(Object)
    );
  });

  it('uses production name when in production', () => {
    process.env.NODE_ENV = 'production';
    const BackendStack = require('../../lib/backend-stack') as jest.Mock;
    BackendStack.mockClear();
    require('../cdk');

    expect(BackendStack).toHaveBeenCalledWith(
      expect.anything(),
      'NG-Backend-Paypal',
      expect.any(Object)
    );
  });
});
