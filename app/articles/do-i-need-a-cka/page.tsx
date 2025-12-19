import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import CKA from '@/components/Articles/CKA/CKA';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Do I really need a CKA certification?';
  const description = 'Why Naeem Gitonga decided to pursue the Certified Kubernetes Administrator certificate and what he learned in the process by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/girl-shrugging-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/do-i-need-a-cka');

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
      <CKA />
      <Footer />
    </>
  );
}
