import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ExampleMcp from '@/components/ExampleMcp/ExampleMcp';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "Example MCP";
  const description =
    'MCP implementation, exploratory, made for understanding how MCP works.';
  const imageUrl = getAbsoluteUrl('/images/example-mcp-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/example-mcp');

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
      <ExampleMcp />
      <Footer />
    </>
  );
}
