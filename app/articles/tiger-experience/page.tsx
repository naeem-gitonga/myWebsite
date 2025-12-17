import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import TigerExperience from '@/components/Articles/TigerExperience/TigerExperience';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "My TI:GER Experience";
  const description = "This isn't an endorsement of the program. This is my experience-by Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/tiger-hero-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/tiger-experience');

  return {
    title,
    description,
    keywords:['Georgia Institute of Technology', 'TI:GER', 'business development', 'product development', 'strategy', 'customer discovery', 'MBA', 'Software Engineering'],
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
        alt: "My TI:GER Experience group photo",
        type: 'image/jpeg',
      }],
      type: "article",
      authors: [siteConfig.author],
      publishedTime: '2025-12-16T00:00:00.000Z',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Article(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <TigerExperience />
      <Footer />
    </>
  );
}
