import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AboutMe from '@/components/AboutMe/AboutMe';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'About Naeem Gitonga',
    description:
      'Learn about the man, the leader, the engineer who is Naeem Gitonga by Naeem Gitonga.',
  };
}

export default async function About(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <AboutMe />
      <Footer />
    </>
  );
}
