import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ExampleRag from '@/components/Articles/ExampleRag/ExampleRag';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Embedding‑Based RAG, Locally: A Serverless‑Style Architecture You Can Ship';
  const description = 'Understanding the components of RAG using embeddings.';
  const imageUrl = getAbsoluteUrl('/images/example-rag-architecture-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/example-rag');

  return {
    title,
    description,
    keywords: ['RAG', 'Embedding', 'AI', 'LLM', 'Machine Learning', 'serverless'],
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
          alt: 'Local RAG architecture diagram',
          type: 'image/webp',
        },
      ],
      type: 'article',
      authors: [siteConfig.author],
      publishedTime: '2026-01-29T00:00:00.000Z',
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
      <ExampleRag />
      <Footer />
    </>
  );
}
