import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ExplainServers from '@/components/Articles/ExplainServers/ExplainServers';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Explain Servers to a 5 Year Old';
  const description = 'Learn the basics about web servers by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/kids-eating-spaghetti-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/explain-servers-to-5-year-old');

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
      <ExplainServers />
      <Footer />
    </>
  );
}
