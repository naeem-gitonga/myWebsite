import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import JSNS from '@/components/Articles/JSNS/JSNS';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: "JavaScript's New Sexy: TypeScript a Developer's Tool",
    description:
      "Learn how TypeScript functions as a developer's tool to use in any application where JavaScript is involved. Naeem Gitonga",
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <JSNS />
      <Footer />
    </>
  );
}
