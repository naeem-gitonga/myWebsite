import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ShutdownSync from '@/components/Articles/ShutdownSync/ShutdownSync';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "A Weekend Learning macOS Development";
  const description = "What happens when you try to shutdown a remote machine from your Mac using launchd, SIGTERM, and shell scripts - by Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/octopus-working-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/shutdown-sync');

  return {
    title,
    description,
    keywords:['macOS', 'LaunchDaemon', 'LaunchAgent', 'launchd', 'SIGTERM', 'shell scripting', 'SSH', 'DGX Spark', 'Software Engineering'],
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
        alt: "An octopus working at a computer desk",
        type: 'image/webp',
      }],
      type: "article",
      authors: [siteConfig.author],
      publishedTime: '2024-12-22T00:00:00.000Z',
    },
    twitter: {
      card: "summary_large_image",
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
      <ShutdownSync />
      <Footer />
    </>
  );
}
