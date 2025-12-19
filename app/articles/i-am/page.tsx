import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AWSIAM from '@/components/Articles/AWSIAM/AWSIAM';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'AWS IAM — Quick Dive/Quick Guide';
  const description = 'Quick dive into AWS Identity and Access Management (IAM) by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/aws-iam-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/i-am');

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
      <AWSIAM />
      <Footer />
    </>
  );
}
