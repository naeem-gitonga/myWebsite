import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartTwo from '@/components/Articles/MicroPartTwo/MicroPartTwo';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'Micro Services Part II: AWS EC2 Linux AMIs Naeem Gitonga',
    description:
      'Learn how to deploy your Docker image to an AWS EC2 instance: Node.js, Docker, and Docker compose by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <MicroPartTwo />
      <Footer />
    </>
  );
}
