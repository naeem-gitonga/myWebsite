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
}
export default function AnalyticsTracker(props: Props) {
  useEffect(() => {
    // Initialize analytics tracking
    const cleanup = initializeAnalytics({
      fromWebsite: props.fromWebsite,
      itemId: props.itemId,
    });
    // Cleanup on unmount
    return cleanup;
  }, []);

  // This component doesn't render anything
  return null;
}
