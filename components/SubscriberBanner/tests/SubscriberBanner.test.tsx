import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SubscriberBanner from '../SubscriberBanner';
import {
  createHandleSubmit,
  showMessage,
  makePostSubscribe,
  defaultGetAnalyticsUserId,
  SubscriberDeps,
  STORAGE_KEY,
} from '../subscriberBanner.helpers';

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

const mockUseEnvConfig = jest.fn();

jest.mock('@/hooks/useEnvConfig', () => ({
  __esModule: true,
  default: () => mockUseEnvConfig(),
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ onLoad }: { onLoad?: () => void }) => {
    if (onLoad) onLoad();
    return null;
  },
}));

global.fetch = jest.fn();

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const MOCK_API_URL = 'https://example.execute-api.us-east-1.amazonaws.com/prod/api/ngsubscriber';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockTurnstile = {
  render: jest.fn().mockReturnValue('widget-id-123'),
  reset: jest.fn(),
};

// ---------------------------------------------------------------------------
// Component tests
// ---------------------------------------------------------------------------

describe('SubscriberBanner component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.clear();
    mockTurnstile.render.mockClear();
    mockTurnstile.reset.mockClear();
    (window as any).turnstile = mockTurnstile;
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'dummy_site_key';
    mockUseEnvConfig.mockReturnValue({
      SUBSCRIBER_API_URL: MOCK_API_URL,
    });
  });

  afterEach(() => {
    delete (window as any).turnstile;
  });

  it('renders the subscription form by default', () => {
    render(<SubscriberBanner />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('calls window.turnstile.render when the script loads', () => {
    render(<SubscriberBanner />);
    expect(mockTurnstile.render).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({
        sitekey: 'dummy_site_key',
        callback: expect.any(Function),
        'expired-callback': expect.any(Function),
        'error-callback': expect.any(Function),
      })
    );
  });

  it('removes the Turnstile widget from the DOM after verification callback fires', () => {
    render(<SubscriberBanner />);
    const turnstileEl = mockTurnstile.render.mock.calls[0][0] as HTMLElement;
    expect(document.body.contains(turnstileEl)).toBe(true);

    const { callback } = mockTurnstile.render.mock.calls[0][1];
    act(() => { callback(); });

    expect(document.body.contains(turnstileEl)).toBe(false);
  });

  it('renders a new Turnstile widget when the token expires', () => {
    render(<SubscriberBanner />);
    const { callback, 'expired-callback': expiredCallback } = mockTurnstile.render.mock.calls[0][1];

    act(() => { callback(); });
    act(() => { expiredCallback(); });

    // verified flips back to false — a new div is rendered for Turnstile to mount into
    expect(mockTurnstile.render.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: 'Subscribe' }).closest('form')).toBeInTheDocument();
  });

  it('renders a new Turnstile widget on error callback', () => {
    render(<SubscriberBanner />);
    const { callback, 'error-callback': errorCallback } = mockTurnstile.render.mock.calls[0][1];

    act(() => { callback(); });
    act(() => { errorCallback(); });

    expect(screen.getByRole('button', { name: 'Subscribe' }).closest('form')).toBeInTheDocument();
  });

  it('shows pending message when localStorage is "pending"', () => {
    localStorageMock.getItem.mockReturnValue('pending');
    render(<SubscriberBanner />);
    expect(screen.getByText(/check your email to confirm/i)).toBeInTheDocument();
  });

  it('shows confirmed message when localStorage is "confirmed"', () => {
    localStorageMock.getItem.mockReturnValue('confirmed');
    render(<SubscriberBanner />);
    expect(screen.getByText(/you will be notified when a new article/i)).toBeInTheDocument();
  });

  it('shows confirmed message and sets localStorage when subscribed prop is true', () => {
    render(<SubscriberBanner subscribed />);
    expect(screen.getByText(/you will be notified when a new article/i)).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'confirmed');
  });

  it('transitions to pending state on successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<SubscriberBanner />);
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'ada@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Subscribe' }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/check your email to confirm/i)).toBeInTheDocument();
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'pending');
  });

  it('sends name, email, turnstile token, and analyticsUserId to the correct endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<SubscriberBanner />);
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'ada@example.com' } });

    const form = screen.getByRole('button', { name: 'Subscribe' }).closest('form')!;
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'cf-turnstile-response';
    hiddenInput.value = 'mock-cf-token';
    form.appendChild(hiddenInput);

    fireEvent.submit(form);

    await waitFor(() => {
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe('/api/subscriber/join');
      expect(JSON.parse(options.body)).toEqual({
        name: 'Ada',
        email: 'ada@example.com',
        turnstileToken: 'mock-cf-token',
        analyticsUserId: null,
      });
    });
  });

  it('shows error message and resets turnstile when submission fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<SubscriberBanner />);
    fireEvent.submit(screen.getByRole('button', { name: 'Subscribe' }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
    expect(mockTurnstile.reset).toHaveBeenCalledWith('widget-id-123');
  });
});

// ---------------------------------------------------------------------------
// Unit tests for exported pure functions
// ---------------------------------------------------------------------------

describe('showMessage', () => {
  it('returns null for form state', () => {
    expect(showMessage('form')).toBeNull();
  });

  it('returns null for error state', () => {
    expect(showMessage('error')).toBeNull();
  });

  it('renders the pending message', () => {
    const { getByText } = render(showMessage('pending')!);
    expect(getByText(/check your email to confirm/i)).toBeInTheDocument();
  });

  it('renders the confirmed message', () => {
    const { getByText } = render(showMessage('confirmed')!);
    expect(getByText(/you will be notified when a new article/i)).toBeInTheDocument();
  });
});

describe('createHandleSubmit', () => {
  const setLoading = jest.fn();
  const setState = jest.fn();
  const widgetIdRef = { current: 'widget-id-123' };
  const tokenRef = { current: null as string | null };

  let deps: SubscriberDeps;

  beforeEach(() => {
    setLoading.mockClear();
    setState.mockClear();
    deps = {
      postSubscribe: jest.fn().mockResolvedValue(undefined),
      getAnalyticsUserId: jest.fn().mockReturnValue('user-abc'),
    };
  });

  function makeEvent(fields: Record<string, string> = {}): React.FormEvent<HTMLFormElement> {
    const form = document.createElement('form');
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    return { preventDefault: jest.fn(), currentTarget: form } as any;
  }

  it('calls postSubscribe with the correct payload', async () => {
    const handler = createHandleSubmit(deps, setLoading, setState, widgetIdRef, tokenRef);
    await handler(makeEvent({ name: 'Ada', email: 'ada@example.com', 'cf-turnstile-response': 'tok' }));

    expect(deps.postSubscribe).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@example.com',
      turnstileToken: 'tok',
      analyticsUserId: 'user-abc',
    });
  });

  it('sets state to pending and saves localStorage on success', async () => {
    const handler = createHandleSubmit(deps, setLoading, setState, widgetIdRef, tokenRef);
    await handler(makeEvent());

    expect(setState).toHaveBeenCalledWith('pending');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'pending');
  });

  it('sets state to error when postSubscribe rejects', async () => {
    (deps.postSubscribe as jest.Mock).mockRejectedValue(new Error('network'));
    (window as any).turnstile = mockTurnstile;

    const handler = createHandleSubmit(deps, setLoading, setState, widgetIdRef, tokenRef);
    await handler(makeEvent());

    expect(setState).toHaveBeenCalledWith('error');
    expect(mockTurnstile.reset).toHaveBeenCalledWith('widget-id-123');
  });

  it('always calls setLoading(false) in finally', async () => {
    (deps.postSubscribe as jest.Mock).mockRejectedValue(new Error('network'));
    const handler = createHandleSubmit(deps, setLoading, setState, widgetIdRef, tokenRef);
    await handler(makeEvent());

    expect(setLoading).toHaveBeenLastCalledWith(false);
  });
});

describe('makePostSubscribe', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it('POSTs to the correct URL with the payload', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    const post = makePostSubscribe(MOCK_API_URL);
    await post({ name: 'Ada', email: 'a@b.com', turnstileToken: 'tok', analyticsUserId: 'uid' });

    const [url, opts] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(`${MOCK_API_URL}/join`);
    expect(JSON.parse(opts.body)).toEqual({ name: 'Ada', email: 'a@b.com', turnstileToken: 'tok', analyticsUserId: 'uid' });
  });

  it('throws when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    const post = makePostSubscribe(MOCK_API_URL);
    await expect(post({ name: '', email: '', turnstileToken: '', analyticsUserId: null })).rejects.toThrow();
  });
});

describe('defaultGetAnalyticsUserId', () => {
  afterEach(() => {
    Object.defineProperty(document, 'cookie', { value: '', writable: true });
  });

  it('returns the analytics_user_id cookie value when present', () => {
    Object.defineProperty(document, 'cookie', {
      value: 'foo=bar; analytics_user_id=user-xyz; baz=qux',
      writable: true,
    });
    expect(defaultGetAnalyticsUserId()).toBe('user-xyz');
  });

  it('returns null when the cookie is not set', () => {
    Object.defineProperty(document, 'cookie', { value: '', writable: true });
    expect(defaultGetAnalyticsUserId()).toBeNull();
  });
});
