import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReadWriteSendXml from '@/components/Articles/ReadWriteSendXml/ReadWriteSendXml';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title:
      'XML, read, send, write: JavaScript client to Express/Node.js server by Naeem Gitonga',
    description:
      'Learn how to read, write, and send XML using a Node.js Express server all using JavaScript by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ReadWriteSendXml />
      <Footer />
    </>
  );
}
