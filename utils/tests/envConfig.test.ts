import {
  buildEnvConfig,
  getEnvConfig,
  resetEnvConfig,
  setEnvConfigForTests,
} from '@/utils/envConfig';

describe('envConfig', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    resetEnvConfig();
  });

  it('buildEnvConfig applies defaults and boolean parsing', () => {
    const config = buildEnvConfig({} as NodeJS.ProcessEnv);

    expect(config.SITE_URL).toBe('https://www.naeemgitonga.com');
    expect(config.ENABLE_ANALYTICS).toBe(false);
    expect(config.SHOW_SHOP).toBe(false);
    expect(config.SHOW_CONSULT).toBe(false);
    expect(config.SHOW_PROMO_BANNER).toBe(false);
  });

  it('buildEnvConfig maps env values', () => {
    const config = buildEnvConfig({
      NODE_ENV: 'production',
      NEXT_PUBLIC_ENABLE_ANALYTICS: '1',
      NEXT_PUBLIC_ANALYTICS_API_URL: 'https://analytics.test',
      NEXT_PUBLIC_SITE_URL: 'https://example.com',
      NEXT_PUBLIC_SHOW_SHOP: 'true',
      NEXT_PUBLIC_SHOW_CONSULT: 'true',
      NEXT_PUBLIC_FORM_URL: 'https://form.test',
      NEXT_PUBLIC_PROMO_BANNER_TEXT: 'hello',
      NEXT_PUBLIC_SHOW_PROMO_BANNER: 'true',
      NEXT_PUBLIC_STAGE: 'prod',
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: 'client-id',
      NEXT_PUBLIC_PAYPAL_API_URL: 'https://paypal.test',
    } as NodeJS.ProcessEnv);

    expect(config.NODE_ENV).toBe('production');
    expect(config.ENABLE_ANALYTICS).toBe(true);
    expect(config.ANALYTICS_API_URL).toBe('https://analytics.test');
    expect(config.SITE_URL).toBe('https://example.com');
    expect(config.SHOW_SHOP).toBe(true);
    expect(config.SHOW_CONSULT).toBe(true);
    expect(config.FORM_URL).toBe('https://form.test');
    expect(config.PROMO_BANNER_TEXT).toBe('hello');
    expect(config.SHOW_PROMO_BANNER).toBe(true);
    expect(config.STAGE).toBe('prod');
    expect(config.PAYPAL_CLIENT_ID).toBe('client-id');
    expect(config.PAYPAL_API_URL).toBe('https://paypal.test');
  });

  it('getEnvConfig caches values until reset', () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SITE_URL: 'https://a.test' };
    const first = getEnvConfig();

    process.env = { ...originalEnv, NEXT_PUBLIC_SITE_URL: 'https://b.test' };
    const second = getEnvConfig();

    expect(first.SITE_URL).toBe('https://a.test');
    expect(second.SITE_URL).toBe('https://a.test');

    resetEnvConfig();
    const third = getEnvConfig();
    expect(third.SITE_URL).toBe('https://b.test');
  });

  it('setEnvConfigForTests overrides cached config', () => {
    const config = setEnvConfigForTests({
      NODE_ENV: 'test',
      ANALYTICS_API_URL: 'https://analytics.test',
      ENABLE_ANALYTICS: true,
    });

    expect(config.NODE_ENV).toBe('test');
    expect(config.ANALYTICS_API_URL).toBe('https://analytics.test');
    expect(config.ENABLE_ANALYTICS).toBe(true);
  });
});
