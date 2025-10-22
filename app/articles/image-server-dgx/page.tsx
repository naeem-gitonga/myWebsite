import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ImageServer from '@/components/Articles/ImageServer/ImageServer';

export function generateMetadata(): Metadata {
  return {
    title: "Image Server on DGX Spark — GPU Inference in 55 Seconds",
    description:
      "Exploring the DGX Spark: A Hands-On Journey Into GPU-Powered Text-to-Image AI by Naeem Gitonga",
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
