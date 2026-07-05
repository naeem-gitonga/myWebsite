import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import LinkedInLockup from '@/components/LinkedInLockup/LinkedInLockup';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'LinkedIn Lockup: The Lead Vetter Story';
  const description =
    'How I built a Chrome extension to vet LinkedIn leads, got flagged as a bot, and learned about behavioral analytics the hard way.';
  const imageUrl = getAbsoluteUrl('/images/linkedin-lockup-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/linkedin-lockup');

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
      <LinkedInLockup />
      <Footer />
    </>
  );
}
