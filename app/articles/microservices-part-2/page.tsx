import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';

export function generateMetadata(): Metadata {
  return {
    title: 'Micro Services Part II: AWS EC2 Linux AMIs Naeem Gitonga',
    description:
      'Learn how to build and deploy microservices using Node.js, Docker, and Docker compose by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      Coming soon!
      <Footer />
    </>
  );
}
