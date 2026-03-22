import styles from './SubscriberBanner.module.scss';

export type BannerState = 'form' | 'pending' | 'confirmed' | 'error';

export const STORAGE_KEY = 'ng_subscriber';

export interface SubscribePayload {
  name: string;
  email: string;
  turnstileToken: string;
  analyticsUserId: string | null;
}

export interface SubscriberDeps {
  postSubscribe: (payload: SubscribePayload) => Promise<void>;
  getAnalyticsUserId: () => string | null;
}

export function defaultGetAnalyticsUserId(): string | null {
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim().split('='))
      .find(([k]) => k === 'analytics_user_id')?.[1] ?? null
  );
}

export function makePostSubscribe(apiUrl: string) {
  return async (payload: SubscribePayload): Promise<void> => {
    const res = await fetch(`${apiUrl}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed');
  };
}

export function createHandleSubmit(
  deps: SubscriberDeps,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setState: React.Dispatch<React.SetStateAction<BannerState>>,
  widgetIdRef: React.RefObject<string | null>,
  tokenRef: React.RefObject<string | null>
) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await deps.postSubscribe({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        turnstileToken: tokenRef.current ?? formData.get('cf-turnstile-response') as string,
        analyticsUserId: deps.getAnalyticsUserId(),
      });
      localStorage.setItem(STORAGE_KEY, 'pending');
      setState('pending');
    } catch {
      setState('error');
      if (typeof window !== 'undefined' && (window as any).turnstile && widgetIdRef.current !== null) {
        (window as any).turnstile.reset(widgetIdRef.current);
      }
    } finally {
      setLoading(false);
    }
  };
}

export function showMessage(state: BannerState): React.JSX.Element | null {
  const { banner, message } = styles;
  if (state === 'pending') {
    return (
      <div className={banner}>
        <p className={message}>
          You&apos;ve subscribed! Check your email to confirm your subscription. 
          Message may take a few minutes to arrive. If you don&apos;t see it, 
          check your spam folder.
        </p>
      </div>
    );
  }
  if (state === 'confirmed') {
    return (
      <div className={banner}>
        <p className={message}>
          You&apos;re subscribed! You will be notified when a new article is published.
        </p>
      </div>
    );
  }
  return null;
}
