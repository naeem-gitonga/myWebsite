'use client'
import type { Metadata } from 'next';

import Donate from '@/components/Donate/Donate';
import Footer from '@/components/Footer/Footer';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import '../globals.css';

function generateMetadata(): Metadata {
  return {
    title: 'Donate',
    description: 'Send a Bitcoin tip to support Naeem Gitonga.',
  };
}

export default async function DonatePage(
  params: Params
): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? 'direct';

  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <Donate />
      <Footer />
    </>
  );
}
