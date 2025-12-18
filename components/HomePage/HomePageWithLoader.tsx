'use client';

import { Suspense, useEffect, useState } from 'react';
import HomePageClient from './HomePageClient';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function HomePageWithLoader() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHome(true), 1500);
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
