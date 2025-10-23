import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ImageServer from '@/components/Articles/ImageServer/ImageServer';

export function generateMetadata(): Metadata {
  return {
    title: "Image Server AI — GPU Inference in 55 Seconds",
    description:
      "GPU inference, memory optimization, and model deployment, text-to-image by Naeem Gitonga",
    keywords:['AI', 'MLOps', 'Cuda', 'DGX Spark', 'Pytorch', 'text-to-image', 'Machine Learning Engineer', 'Software Engineering'],
    openGraph: {
      title: "Image Server AI — GPU Inference in 55 Seconds",
      images: [{
        url: "https://d2j3yisnywcb30.cloudfront.net/pix/ai-generated-image.png",
        width: 1200,
        height: 627,
      }],
      type: "website"
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
