import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AiRuinedMyApp from '@/components/Articles/AiRuinedMyApp/AiRuinedMyApp';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "AI Ruined My App";
  const description =
    'A cautionary tale about relying too heavily on AI for architectural decisions in application development.';
  const imageUrl = getAbsoluteUrl('/images/ai-ruined-my-app-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/ai-ruined-my-app');

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
      <AiRuinedMyApp />
      <Footer />
    </>
  );
}
