'use client';

import { useEffect } from 'react';
import { initializeAnalytics } from '@/utils/analytics';

/**
 * Client component to track page views and scroll completion
 * Add this to any page/layout where you want analytics tracking
 *
 * Usage:
 * ```tsx
 * import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
 *
 * export default function ArticlePage() {
 *   return (
 *     <>
 *       <AnalyticsTracker />
 *       <YourContent />
 *     </>
 *   );
 * }
 * ```
 */
type Props = {
  fromWebsite: string;
  itemId?: string;
};

const STAGING_TAG = 'analytics-staging';
const STAGING_HOSTS = ['localhost', 'staging.naeemgitonga.com', 'www.staging.naeemgitonga.com'];

export function getStagingTag(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const hostname = window.location.hostname.toLowerCase();
  return STAGING_HOSTS.includes(hostname) ? STAGING_TAG : undefined;
}

function normalizeFromWebsite(value: string, stagingTag?: string): string {
  const baseValue = value?.trim() || 'direct';
  return stagingTag ? `${baseValue}|${stagingTag}` : baseValue;
}

export default function AnalyticsTracker(props: Props) {
  useEffect(() => {
    const stagingTag = getStagingTag();
    const cleanup = initializeAnalytics({
      fromWebsite: normalizeFromWebsite(props.fromWebsite, stagingTag),
      itemId: props.itemId,
    });
    return cleanup;
  }, [props.fromWebsite, props.itemId]);

  return null;
}
