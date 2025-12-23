export type EnvConfig = {
  NODE_ENV: string | undefined;
  ENABLE_ANALYTICS: boolean;
  ANALYTICS_API_URL: string | undefined;
  SITE_URL: string;
  SHOW_SHOP: boolean;
  SHOW_CONSULT: boolean;
  FORM_URL: string | undefined;
  PROMO_BANNER_TEXT: string | undefined;
  SHOW_PROMO_BANNER: boolean;
  STAGE: string | undefined;
  PAYPAL_CLIENT_ID: string | undefined;
  PAYPAL_API_URL: string | undefined;
};

const DEFAULT_SITE_URL = 'https://www.naeemgitonga.com';

let cachedConfig: EnvConfig | null = null;

export function buildEnvConfig(env: NodeJS.ProcessEnv = process.env): EnvConfig {
  return {
    NODE_ENV: env.NODE_ENV,
    ENABLE_ANALYTICS: Boolean(env.NEXT_PUBLIC_ENABLE_ANALYTICS),
    ANALYTICS_API_URL: env.NEXT_PUBLIC_ANALYTICS_API_URL,
    SITE_URL: env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
    SHOW_SHOP: env.NEXT_PUBLIC_SHOW_SHOP === 'true',
    SHOW_CONSULT: env.NEXT_PUBLIC_SHOW_CONSULT === 'true',
    FORM_URL: env.NEXT_PUBLIC_FORM_URL,
    PROMO_BANNER_TEXT: env.NEXT_PUBLIC_PROMO_BANNER_TEXT,
    SHOW_PROMO_BANNER: env.NEXT_PUBLIC_SHOW_PROMO_BANNER === 'true',
    STAGE: env.NEXT_PUBLIC_STAGE,
    PAYPAL_CLIENT_ID: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    PAYPAL_API_URL: env.NEXT_PUBLIC_PAYPAL_API_URL,
  };
}

export function getEnvConfig(): EnvConfig {
  if (!cachedConfig) {
    cachedConfig = buildEnvConfig();
  }

  return cachedConfig;
}

export function resetEnvConfig(): void {
  cachedConfig = null;
}

export function setEnvConfigForTests(
  overrides: Partial<EnvConfig>
): EnvConfig {
  cachedConfig = { ...buildEnvConfig(), ...overrides };
  return cachedConfig;
}
