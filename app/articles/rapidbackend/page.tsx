import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import RapidBackend from '@/components/Articles/RapidBackEnd/RapidBackend';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Exploring Functions as Microservices';
  const description = 'You like Node, TypeScript, AWS Lambdas, JWTs, microservices and you need to deploy a comprehensive back-end solution. Enter Rapid Back-End by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/rapidbackend-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/rapidbackend');

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
      <RapidBackend />
      <Footer />
    </>
  );
}
