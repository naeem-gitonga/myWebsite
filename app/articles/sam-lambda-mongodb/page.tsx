import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import SamLambdaMongoDB from '@/components/Articles/SamLambdaMongoDB/SamLambdaMongoDB';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title:
      'Deploy GoLang Lambda With MongoDB using AWS SAM (Part 3) by Naeem Gitonga',
    description:
      'Learn how to deploy an AWS lambda with a Golang runtime using AWS SAM by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <SamLambdaMongoDB />
      <Footer />
    </>
  );
}
