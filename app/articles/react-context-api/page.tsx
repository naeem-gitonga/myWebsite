import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReactContextApi from '@/components/Articles/ReactContextApi/ReactContextApi';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'React Context-Api and Lazy-loading: Naeem Gitonga',
    description:
      "An overview of React's context api with lazy loading by Naeem Gitonga",
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ReactContextApi />
      <Footer />
    </>
  );
}
