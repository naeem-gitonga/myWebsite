import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReactContextApi from '@/components/Articles/ReactContextApi/ReactContextApi';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'React Context-Api and Lazy-loading';
  const description = "An overview of React's context api with lazy loading by Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/react-context-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/react-context-api');

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
      <ReactContextApi />
      <Footer />
    </>
  );
}
