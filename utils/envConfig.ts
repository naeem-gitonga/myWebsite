export type EnvConfig = {
  NODE_ENV: string | undefined;
  ENABLE_ANALYTICS: boolean | string | undefined;
  ANALYTICS_API_URL: string | undefined;
  SITE_URL: string | undefined;
  SHOW_SHOP: boolean | string | undefined;
  SHOW_CONSULT: boolean | string | undefined;
  FORM_URL: string | undefined;
  PROMO_BANNER_TEXT: string | undefined;
  SHOW_PROMO_BANNER: boolean | string | undefined;
  STAGE: string | undefined;
  PAYPAL_CLIENT_ID: string | undefined;
  PAYPAL_API_URL: string | undefined;
  ADMIN_PASS: string | undefined;
  AWS_ATHENA_KEY: string | undefined;
  AWS_ATHENA_SECRET: string | undefined;
  AWS_REGION: string | undefined;
  ATHENA_OUTPUT_BUCKET: string | undefined;
};

// env config
const DEFAULT_SITE_URL = 'https://www.naeemgitonga.com';

let cachedConfig: EnvConfig | {};

export function buildEnvConfig(): EnvConfig {
  return {
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    ANALYTICS_API_URL: process.env.NEXT_PUBLIC_ANALYTICS_API_URL,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
    SHOW_SHOP: process.env.NEXT_PUBLIC_SHOW_SHOP,
    SHOW_CONSULT: process.env.NEXT_PUBLIC_SHOW_CONSULT,
    FORM_URL: process.env.NEXT_PUBLIC_FORM_URL,
    PROMO_BANNER_TEXT: process.env.NEXT_PUBLIC_PROMO_BANNER_TEXT,
    SHOW_PROMO_BANNER: process.env.NEXT_PUBLIC_SHOW_PROMO_BANNER,
    STAGE: process.env.NEXT_PUBLIC_STAGE,
    PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    PAYPAL_API_URL: process.env.NEXT_PUBLIC_PAYPAL_API_URL,
    ADMIN_PASS: process.env.ADMIN_PASS,
    AWS_ATHENA_KEY: process.env.AWS_ATHENA_KEY,
    AWS_ATHENA_SECRET: process.env.AWS_ATHENA_SECRET,
    AWS_REGION: process.env.AWS_REGION,
    ATHENA_OUTPUT_BUCKET: process.env.ATHENA_OUTPUT_BUCKET,
  };
}

export function getEnvConfig(): EnvConfig {
  if (!cachedConfig) {
    cachedConfig = buildEnvConfig();
  }

  return cachedConfig as EnvConfig;
}

export function resetEnvConfig(): void {
  cachedConfig = {};
}

export function setEnvConfigForTests(
  overrides: Partial<EnvConfig>
): EnvConfig {
  cachedConfig = { ...buildEnvConfig(), ...overrides };
  return cachedConfig as EnvConfig;
}
