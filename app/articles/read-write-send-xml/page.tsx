import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReadWriteSendXml from '@/components/Articles/ReadWriteSendXml/ReadWriteSendXml';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'XML, read, send, write: JavaScript client to Express/Node.js server';
  const description = 'Learn how to read, write, and send XML using a Node.js Express server all using JavaScript by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/computer-genius-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/read-write-send-xml');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 627,
        alt: title,
        type: 'image/jpeg',
      }],
      type: 'article',
      authors: [siteConfig.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ReadWriteSendXml />
      <Footer />
    </>
  );
}
