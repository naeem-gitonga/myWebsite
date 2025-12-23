import * as analytics from '@/utils/analytics';
import { resetEnvConfig, setEnvConfigForTests } from '@/utils/envConfig';

const props: PageAnalyticsData = { fromWebsite: 'test-site', itemId: '123' };

describe('analytics', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    sessionStorage.clear();
    jest.restoreAllMocks();
    resetEnvConfig();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('logs in development when analytics is disabled', async () => {
    setEnvConfigForTests({
      NODE_ENV: 'development',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: undefined,
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    global.fetch = jest.fn();

    await analytics.trackEvent('page_view', { foo: 'bar' });

    expect(logSpy).toHaveBeenCalledWith('[Analytics]', 'page_view', { foo: 'bar' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('warns when API URL is missing', async () => {
    setEnvConfigForTests({
      NODE_ENV: 'production',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: undefined,
    });

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = jest.fn();

    await analytics.trackEvent('page_view', { foo: 'bar' });

    expect(warnSpy).toHaveBeenCalledWith('[Analytics] API URL not configured');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('posts a well-formed event when configured', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01T00:00:00.000Z'));
    setEnvConfigForTests({
      NODE_ENV: 'production',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: 'https://example.com',
    });

    window.history.pushState({}, '', '/test-page');
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 720, writable: true });

    const fetchSpy = jest.fn().mockResolvedValue({});
    global.fetch = fetchSpy;

    await analytics.trackEvent('page_view', { foo: 'bar' });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://example.com/track');
    expect(options).toMatchObject({ method: 'POST', keepalive: true });

    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.eventType).toBe('page_view');
    expect(body.page).toBe('/test-page');
    expect(body.userAgent).toBe(navigator.userAgent);
    expect(body.bucket).toBe('test-analytics-gtng');
    expect(body.referrer).toBe('direct');
    expect(body.metadata).toEqual({ foo: 'bar' });
    expect(body.viewport).toEqual({ width: 1280, height: 720 });
    expect(body.timestamp).toBe('2025-01-01T00:00:00.000Z');

    jest.useRealTimers();
  });

  it('handles fetch errors gracefully', async () => {
    setEnvConfigForTests({
      NODE_ENV: 'production',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: 'https://example.com',
    });
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error('boom'));

    await analytics.trackEvent('page_view', { foo: 'bar' });

    expect(debugSpy).toHaveBeenCalled();
  });

  it('tracks scroll completion once and returns cleanup', () => {
    setEnvConfigForTests({
      NODE_ENV: 'production',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: 'https://example.com',
    });

    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const fetchSpy = jest.fn().mockResolvedValue({});
    global.fetch = fetchSpy;

    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    const cleanup = analytics.setupScrollTracking(props);

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [, options] = fetchSpy.mock.calls[0];
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.eventType).toBe('scroll_complete');
    expect(body.metadata).toEqual(expect.objectContaining({ ...props, scrollDepth: 100 }));

    cleanup();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('wires trackPageView and setupScrollTracking via initializeAnalytics', () => {
    setEnvConfigForTests({
      NODE_ENV: 'production',
      ENABLE_ANALYTICS: false,
      ANALYTICS_API_URL: 'https://example.com',
    });

    const fetchSpy = jest.fn().mockResolvedValue({});
    global.fetch = fetchSpy;
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const cleanup = analytics.initializeAnalytics(props);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [, options] = fetchSpy.mock.calls[0];
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.eventType).toBe('page_view');
    expect(body.metadata).toEqual(props);

    cleanup();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  describe('SSR handling', () => {
    const originalWindow = global.window;

    afterEach(() => {
      global.window = originalWindow;
    });

    it('trackEvent returns early when window is undefined', async () => {
      // @ts-expect-error - simulating SSR
      delete global.window;
      setEnvConfigForTests({
        NODE_ENV: 'production',
        ENABLE_ANALYTICS: false,
        ANALYTICS_API_URL: 'https://example.com',
      });

      const fetchSpy = jest.fn();
      global.fetch = fetchSpy;

      await analytics.trackEvent('page_view', { foo: 'bar' });

      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('setupScrollTracking returns no-op cleanup when window is undefined', () => {
      // @ts-expect-error - simulating SSR
      delete global.window;

      const cleanup = analytics.setupScrollTracking(props);

      expect(typeof cleanup).toBe('function');
      expect(cleanup()).toBeUndefined();
    });
  });
});
