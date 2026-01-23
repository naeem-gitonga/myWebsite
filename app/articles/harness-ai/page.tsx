import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import HarnessAi from '@/components/Articles/HarnessAi/HarnessAi';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "Harnessing AI: Layer Cake and Platform Shift";
  const description =
    'A breakdown of the AI layer cake, platform shift, and what it means for jobs, infrastructure, and builders.';
  const imageUrl = getAbsoluteUrl('/images/ai-layer-cake-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/harness-ai');

  return {
    title,
    description,
    keywords: [
      'AI',
      'Nvidia',
      'Jensen Huang',
      'AI Infrastructure',
      'Platform Shift',
      'Cloud Computing',
      'AI Models',
      'GPU',
      'Jobs',
      'Regulated Compute',
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
          alt: 'AI layer cake diagram of the AI stack',
          type: 'image/jpeg',
        },
      ],
      type: 'article',
      authors: [siteConfig.author],
      publishedTime: '2026-01-25T00:00:00.000Z',
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
      <HarnessAi />
      <Footer />
    </>
  );
}
