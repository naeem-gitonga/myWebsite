import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import CollaborativeProductDevelopment from '@/components/CollaborativeProductDevelopment/CollaborativeProductDevelopment';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Collaborative Product Development';
  const description =
    'Building Echo Inventory: what I learned taking a Collaborative Product Development course and shipping a real AI-powered app in weeks.';
  const imageUrl = getAbsoluteUrl('/images/collaborative-product-development-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/collaborative-product-development');

  return {
    title,
    description,
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
          alt: title,
          type: 'image/webp',
        },
      ],
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
  const from = searchParams?.fromWebsite ?? 'direct';
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <CollaborativeProductDevelopment />
      <Footer />
    </>
  );
}
