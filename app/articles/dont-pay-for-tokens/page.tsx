import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import DontPayForTokens from '@/components/DontPayForTokens/DontPayForTokens';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "I Don't Pay For Tokens";
  const description =
    'The difference between using AI and building AI, and why compute costs replace token costs.';
  const imageUrl = getAbsoluteUrl('/images/dont-pay-for-tokens-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/dont-pay-for-tokens');

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
      <DontPayForTokens />
      <Footer />
    </>
  );
}
