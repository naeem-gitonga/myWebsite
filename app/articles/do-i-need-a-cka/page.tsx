import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import CKA from '@/components/Articles/CKA/CKA';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'Do I really need a CKA certification?: Naeem Gitonga',
    description:
      'Why Naeem Gitonga decided to pursue the Certified Kubernetes Administrator certificate and what he learned in the process by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <CKA />
      <Footer />
    </>
  );
}
