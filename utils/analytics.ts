/**
 * Analytics tracking utility for page views and scroll completion
 * Sends events to the analytics Lambda function
 */


export interface AnalyticsEvent {
  eventType: 'page_view' | 'scroll_complete';
  timestamp: string;
  page: string;
  userAgent: string;
  viewport: { width: number; height: number };
  sessionId: string;
  referrer?: string;
  metadata?: Record<string, any>;
  bucket: string;
  fromWebsite?: string
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';

  const SESSION_KEY = 'analytics_session_id';
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  eventType: AnalyticsEvent['eventType'],
  metadata?: Record<string, any>
): Promise<void> {
  // Don't track in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
    console.log('[Analytics]', eventType, metadata);
    return;
  }

  // Don't track on server side
  if (typeof window === 'undefined') return;

  const apiUrl = process.env.NEXT_PUBLIC_ANALYTICS_API_URL;
  if (!apiUrl) {
    console.warn('[Analytics] API URL not configured');
    return;
  }

  const event: AnalyticsEvent = {
    eventType,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    bucket: 'test-analytics-gtng',
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    sessionId: getSessionId(),
    referrer: document.referrer || 'direct',
    metadata,
    fromWebsite: metadata?.fromWebsite || 'unknown'
  };

  try {
    await fetch(`${apiUrl}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      // Don't wait for response, don't block page
      keepalive: true,
    });
  } catch (error) {
    // Fail silently - don't break user experience
    console.debug('[Analytics] Error:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(props:PageAnalyticsData): void {
  trackEvent('page_view', props);
}

/**
 * Set up scroll tracking to detect when user reaches bottom of page
 * Returns cleanup function
 */
export function setupScrollTracking(props: PageAnalyticsData): () => void {
  if (typeof window === 'undefined') return () => {};

  let hasScrolledToBottom = false;
  const pageLoadTime = Date.now();

  const checkScroll = () => {
    if (hasScrolledToBottom) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Consider "bottom" as 95% to account for margins/footers
    if (scrollPosition >= documentHeight * 0.95) {
      hasScrolledToBottom = true;

      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);

      trackEvent('scroll_complete', {
        timeOnPage,
        scrollDepth: 100,
        fromWebsite: props.fromWebsite
      });
    }
  };

  // Use passive listener for better scroll performance
  window.addEventListener('scroll', checkScroll, { passive: true });

  // Also check on resize (user might resize window to see more content)
  window.addEventListener('resize', checkScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', checkScroll);
    window.removeEventListener('resize', checkScroll);
  };
}

/**
 * Hook for React components to track page view and scroll
 * Usage in a component:
 *
 * ```tsx
 * useEffect(() => {
 *   trackPageView();
 *   const cleanup = setupScrollTracking();
 *   return cleanup;
 * }, []);
 * ```
 */

export function initializeAnalytics(props: PageAnalyticsData): () => void {
  trackPageView(props);
  return setupScrollTracking(props);
}
