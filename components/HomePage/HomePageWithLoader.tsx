'use client';

import { Suspense, useEffect, useState } from 'react';
import HomePageClient from './HomePageClient';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

const HOME_LOADER_FLAG = 'homePageLoaderShown';

export const hasSeenLoader = () => {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(HOME_LOADER_FLAG) === 'true';
};

export default function HomePageWithLoader() {
  const [showHome, setShowHome] = useState(() => hasSeenLoader());

  useEffect(() => {
    if (hasSeenLoader()) {
      setShowHome(true);
      return;
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(HOME_LOADER_FLAG, 'true');
      setShowHome(true);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!showHome) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomePageClient />
    </Suspense>
  );
}
