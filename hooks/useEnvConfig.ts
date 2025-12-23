import { useEffect, useState } from 'react';
import { buildEnvConfig, EnvConfig } from '@/utils/envConfig';

export default function useEnvConfig(): EnvConfig {
  const [config, setConfig] = useState<EnvConfig | {}>({});

  useEffect(() => {
    setConfig(buildEnvConfig());
  }, []);

  return config as EnvConfig;
}
