import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ExplainServers from '@/components/Articles/ExplainServers/ExplainServers';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'Explain Servers to a 5 Year Old by Naeem Gitonga',
    description: 'Learn the basics about web servers by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ExplainServers />
      <Footer />
    </>
  );
}
