import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import SamLambdaMongoDB from '@/components/Articles/SamLambdaMongoDB/SamLambdaMongoDB';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Deploy GoLang Lambda With MongoDB using AWS SAM (Part 3)';
  const description = 'Learn how to deploy an AWS lambda with a Golang runtime using AWS SAM by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/SAM-Golang-MongoDB-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/sam-lambda-mongodb');

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
      <SamLambdaMongoDB />
      <Footer />
    </>
  );
}
