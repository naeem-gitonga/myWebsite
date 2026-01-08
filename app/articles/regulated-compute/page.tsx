import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import RegulatedCompute from '@/components/Articles/RegulatedCompute/RegulatedCompute';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Regulated Compute: Chasing H100s for a Real-Time Avatar';
  const description = 'GPU quota friction, regulated compute, and the hunt for H100 capacity.';
  const imageUrl = getAbsoluteUrl('/images/frustrated-man-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/regulated-compute');

  return {
    title,
    description,
    keywords: [
      'H100',
      'GPU',
      'AWS',
      'Azure',
      'GCP',
      'Regulated Compute',
      'Cloud Infrastructure',
      'MLOps',
      'Startups',
      'Quotas',
    ],
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 627,
          alt: 'Frustrated engineer waiting on cloud GPU quotas',
          type: 'image/webp',
        },
      ],
      type: 'article',
      authors: [siteConfig.author],
      publishedTime: '2026-01-08T00:00:00.000Z',
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
  const from = searchParams?.fromWebsite ?? 'direct';
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <RegulatedCompute />
      <Footer />
    </>
  );
}
