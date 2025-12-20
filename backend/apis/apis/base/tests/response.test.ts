/** @jest-environment node */
import response from '../response';

describe('response', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('includes cors headers for success responses', async () => {
    process.env.ORIGIN = 'https://example.com';
    const result = await response({ ok: true }, 200);

    expect(result.statusCode).toBe(200);
    expect(result.headers?.['Access-Control-Allow-Origin']).toBe(
      'https://example.com'
    );
    expect(result.body).toBe(JSON.stringify({ ok: true }));
  });

  it('returns error payload for failures', async () => {
    const err = new Error('boom');
    const result = await response('ignored', 500, err, { 'X-Test': 'yes' }, {
      'Set-Cookie': ['a=b'],
    });

    const body = JSON.parse(result.body);
    expect(body.error.message).toBe('boom');
    expect(result.headers?.['X-Test']).toBe('yes');
    expect(result.headers?.['Access-Control-Allow-Origin']).toBeUndefined();
  });
});
