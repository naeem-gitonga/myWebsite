'use client';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import styles from './SubscriberBanner.module.scss';
import useEnvConfig from '@/hooks/useEnvConfig';
import useSubscriberSync from '@/hooks/useSubscriberSync';
import {
  BannerState,
  STORAGE_KEY,
  SubscriberDeps,
  createHandleSubmit,
  defaultGetAnalyticsUserId,
  makePostSubscribe,
  showMessage,
} from './subscriberBanner.helpers';

type Props = { subscribed?: boolean };

export default function SubscriberBanner({ subscribed }: Props): React.JSX.Element {
  const [state, setState] = useState<BannerState>('form');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const envConfig = useEnvConfig();

  const deps: SubscriberDeps = {
    postSubscribe: makePostSubscribe('/api/subscriber'),
    getAnalyticsUserId: defaultGetAnalyticsUserId,
  };

  function renderTurnstile() {
    if (turnstileRef.current && typeof window !== 'undefined' && (window as any).turnstile && widgetIdRef.current === null) {
      widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'auto',
        callback: (token: string) => { tokenRef.current = token; setVerified(true); },
        'expired-callback': () => { tokenRef.current = null; setVerified(false); },
        'error-callback': () => { tokenRef.current = null; setVerified(false); },
      });
    }
  }

  useSubscriberSync(setState, envConfig);

  useEffect(() => {
    if (subscribed) {
      localStorage.setItem(STORAGE_KEY, 'confirmed');
      setState('confirmed');
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'confirmed') setState('confirmed');
    else if (stored === 'pending') setState('pending');
  }, [subscribed]);

  // If the Turnstile script was already loaded (e.g. navigating back to this page),
  // window.turnstile is already defined — render explicitly when the form is visible.
  useEffect(() => {
    if (state === 'form') {
      renderTurnstile();
    }
  }, [state]);

  const msg = showMessage(state);
  if (msg) return msg;

  const { banner, prompt, form, fields, input, button, error } = styles;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={renderTurnstile}
      />
      <div className={banner}>
        <p className={prompt}>Get notified when new articles drop.</p>
        <form className={form} onSubmit={createHandleSubmit(deps, setLoading, setState, widgetIdRef, tokenRef)}>
          <div className={fields}>
            <input
              className={input}
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
            <input
              className={input}
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <button className={button} type="submit" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {!verified && <div ref={turnstileRef} />}
          {state === 'error' && (
            <p className={error}>Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </>
  );
}
