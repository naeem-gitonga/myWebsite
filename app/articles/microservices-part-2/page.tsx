import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import MicroPartTwo from '@/components/Articles/MicroPartTwo/MicroPartTwo';

export function generateMetadata(): Metadata {
  return {
    title: 'Micro Services Part II: AWS EC2 Linux AMIs Naeem Gitonga',
    description:
      'Learn how to deploy your Docker image to an AWS EC2 instance: Node.js, Docker, and Docker compose by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <MicroPartTwo />
      <Footer />
    </>
  );
}
