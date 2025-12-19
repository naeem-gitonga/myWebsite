import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import DefaultParameters from '@/components/Articles/DefaultParameters/DefaultParameters';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "Are JavaScript's default parameters slowing me down?";
  const description = 'Learn how JavaScript default parameters affect code execution time by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/dont-panic-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/default-parameters');

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
      <DefaultParameters />
      <Footer />
    </>
  );
}
