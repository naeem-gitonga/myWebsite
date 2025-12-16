import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import TigerExperience from '@/components/Articles/TigerExperience/TigerExperience';

export function generateMetadata(): Metadata {
  return {
    title: "My TI:GER Experience",
    description:
      "This isn't an endorsement of the program. This is my experience-by Naeem Gitonga",
    keywords:['Georgia Institute of Technology', 'TI:GER', 'business development', 'product development', 'strategy', 'customer discovery', 'MBA', 'Software Engineering'],
    openGraph: {
      title: "My TI:GER Experience",
      description: "This isn't an endorsement of the program. This is my experience-by Naeem Gitonga",
      url: "https://www.staging.naeemgitonga.com/articles/tiger-experience",
      siteName: "Naeem Gitonga",
      images: [{
        url: "https://www.staging.naeemgitonga.com/images/tiger-group.png",
        width: 1200,
        height: 627,
        alt: "My TI:GER Experience group photo"
      }],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: "My TI:GER Experience",
      description: "This isn't an endorsement of the program. This is my experience-by Naeem Gitonga",
      images: ["https://www.staging.naeemgitonga.com/images/tiger-group.png"],
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
