import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import RapidBackend from '@/components/Articles/RapidBackEnd/RapidBackend';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'Exploring Functions as Microservices: Naeem Gitonga',
    description:
      'You like Node, TypeScript, AWS Lambdas, JWTs, microservices and you need to deploy a comprehensive back-end solution. Enter Rapid Back-End by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <RapidBackend />
      <Footer />
    </>
  );
}
