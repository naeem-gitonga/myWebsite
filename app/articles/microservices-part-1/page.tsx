import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartOne from '@/components/Articles/MicroPartOne/MicroPartOne';

export function generateMetadata(): Metadata {
  return {
    title:
      'Micro Services Part I: Node, Docker, and Docker Compose by Naeem Gitonga',
    description:
      'Learn how to build and deploy microservices using Node.js, Docker, and Docker compose by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <MicroPartOne />
      <Footer />
    </>
  );
}
