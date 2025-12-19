import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartTwo from '@/components/Articles/MicroPartTwo/MicroPartTwo';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Micro Services Part II: AWS EC2 Linux AMIs';
  const description = 'Learn how to deploy your Docker image to an AWS EC2 instance: Node.js, Docker, and Docker compose by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/ec2-linux-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/microservices-part-2');

  return {
    title,
    description,
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
        alt: title,
        type: 'image/jpeg',
      }],
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
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <MicroPartTwo />
      <Footer />
    </>
  );
}
