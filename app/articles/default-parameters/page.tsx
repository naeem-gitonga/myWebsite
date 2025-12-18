import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import DefaultParameters from '@/components/Articles/DefaultParameters/DefaultParameters';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: "Are JavaScript's default parameters slowing me down?",
    description:
      'Learn how JavaScript default parameters affect code execution time by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <DefaultParameters />
      <Footer />
    </>
  );
}
