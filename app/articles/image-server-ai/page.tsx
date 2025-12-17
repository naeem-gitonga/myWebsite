import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ImageServer from '@/components/Articles/ImageServer/ImageServer';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = "Image Server AI — GPU Inference in 55 Seconds";
  const description = "GPU inference, memory optimization, and model deployment, text-to-image by Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/ai-generated-image-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/image-server-ai');

  return {
    title,
    description,
    keywords:['AI', 'MLOps', 'Cuda', 'DGX Spark', 'Pytorch', 'text-to-image', 'Machine Learning Engineer', 'Software Engineering'],
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
        alt: "AI Generated Image from GPU Server",
        type: 'image/jpeg',
      }],
      type: "article",
      authors: [siteConfig.author],
      publishedTime: '2024-11-01T00:00:00.000Z',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <ImageServer />
      <Footer />
    </>
  );
}
