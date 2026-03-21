import { useEffect } from 'react';
import { EnvConfig } from '@/utils/envConfig';
import { BannerState, STORAGE_KEY } from '@/components/SubscriberBanner/subscriberBanner.helpers';

type SubscriberState = 'confirmed' | 'pending' | 'not_found';

export interface SubscriberSyncDeps {
  fetchStatus: (analyticsUserId: string) => Promise<SubscriberState>;
  getAnalyticsUserId: () => string | null;
}

export function makeSubscriberStatusFetch(apiUrl: string) {
  return async (analyticsUserId: string): Promise<SubscriberState> => {
    const res = await fetch(`${apiUrl}/status?analyticsUserId=${encodeURIComponent(analyticsUserId)}`);
    if (!res.ok) throw new Error('Failed');
    const data: { state: SubscriberState } = await res.json();
    return data.state;
  };
}

export default function useSubscriberSync(
  setState: React.Dispatch<React.SetStateAction<BannerState>>,
  envConfig: EnvConfig,
  deps?: SubscriberSyncDeps
) {
  useEffect(() => {
    const getAnalyticsUserId = deps?.getAnalyticsUserId ?? (() =>
      document.cookie
        .split(';')
        .map((c) => c.trim().split('='))
        .find(([k]) => k === 'analytics_user_id')?.[1] ?? null
    );

    const fetchStatus = deps?.fetchStatus ?? makeSubscriberStatusFetch('/api/subscriber');

    if (localStorage.getItem(STORAGE_KEY) === 'confirmed') return;

    const analyticsUserId = getAnalyticsUserId();
    if (!analyticsUserId) return;

    fetchStatus(analyticsUserId)
      .then((state) => {
        if (state === 'not_found') return;
        localStorage.setItem(STORAGE_KEY, state);
        setState(state);
      })
      .catch(() => {}); // fail silently — don't disrupt the page
  }, []);
}
