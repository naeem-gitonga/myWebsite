import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AWSIAM from '@/components/Articles/AWSIAM/AWSIAM';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'AWS IAM — Quick Dive/Quick Guide: Naeem Gitonga',
    description:
      'Quick dive into AWS Identity and Access Management (IAM) by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <AWSIAM />
      <Footer />
    </>
  );
}
