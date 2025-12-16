import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import TigerExperience from '@/components/Articles/TigerExperience/TigerExperience';
import { getAbsoluteUrl, siteConfig } from '@/lib/siteConfig';

export function generateMetadata(): Metadata {
  const title = "My TI:GER Experience";
  const description = "This isn't an endorsement of the program. This is my experience-by Naeem Gitonga";
  const imageUrl = getAbsoluteUrl('/images/tiger-group-og.jpg');
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
      type: "article"
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
      <TigerExperience />
      <Footer />
    </>
  );
}
