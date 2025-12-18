import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartOne from '@/components/Articles/MicroPartOne/MicroPartOne';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title:
      'Micro Services Part I: Node, Docker, and Docker Compose by Naeem Gitonga',
    description:
      'Learn how to build and deploy microservices using Node.js, Docker, and Docker compose by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <MicroPartOne />
      <Footer />
    </>
  );
}
