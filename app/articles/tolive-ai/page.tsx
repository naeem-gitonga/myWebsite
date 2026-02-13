import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ToLiveAi from '@/components/Articles/ToLiveAi/ToLiveAi';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'ToLive AI';
  const description =
    'Your personal AI that knows you. Write your thoughts, upload documents, and chat with an AI grounded in your own words.';
  const imageUrl = getAbsoluteUrl('/images/tolive-ai-hero-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/tolive-ai');

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
          width: 1536,
          height: 1024,
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
      <ToLiveAi />
      <Footer />
    </>
  );
}
