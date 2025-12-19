import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import JSNS from '@/components/Articles/JSNS/JSNS';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "JavaScript's New Sexy: TypeScript a Developer's Tool";
  const description = "Learn how TypeScript functions as a developer's tool to use in any application where JavaScript is involved. Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/js-new-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/js-new-sexy');

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
      <JSNS />
      <Footer />
    </>
  );
}
