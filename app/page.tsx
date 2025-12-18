import type { Metadata } from 'next';
import HomePageWithLoader from '@/components/HomePage/HomePageWithLoader';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';


export function generateMetadata(): Metadata {
  const title = 'Home | Naeem Gitonga';
  const description = 'Naeem Gitonga of GTNG, engineering and business leader, Software | DevOps | MLOps subject matter expert.';
  const imageUrl = getAbsoluteUrl('/images/me-with-lion-og.jpg');
  const pageUrl = getAbsoluteUrl('/');

  return {
    title,
    description,
    keywords:['Business Development',
      'Product Development',
      'Strategy',
      'Customer Discovery',
      'MBA',
      'Software Engineering',
      'MLOps',
      'DevOps'
    ],
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
        alt: "I might be a TI:GER but I hang with Lions!",
        type: 'image/jpeg',
      }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
export default function Page() {
  return <HomePageWithLoader />;
}
