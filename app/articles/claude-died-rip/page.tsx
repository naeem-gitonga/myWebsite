import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ClaudeDiedRip from '@/components/Articles/ClaudeDiedRip/ClaudeDiedRip';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Claude Died, RIP';
  const description =
    'I built a coding CLI tool with a local model. Then it beat the original.';
  const imageUrl = getAbsoluteUrl('/images/claude-died-rip-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/claude-died-rip');

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
          height: 626,
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
      <ClaudeDiedRip />
      <Footer />
    </>
  );
}
