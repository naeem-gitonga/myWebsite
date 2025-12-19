import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartOne from '@/components/Articles/MicroPartOne/MicroPartOne';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Micro Services Part I: Node, Docker, and Docker Compose';
  const description = 'Learn how to build and deploy microservices using Node.js, Docker, and Docker compose by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/docker-node-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/microservices-part-1');

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
      <MicroPartOne />
      <Footer />
    </>
  );
}
