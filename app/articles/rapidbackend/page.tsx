import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import RapidBackend from '@/components/Articles/RapidBackEnd/RapidBackend';

export function generateMetadata(): Metadata {
  return {
    title: 'Exploring Functions as Microservices: Naeem Gitonga',
    description:
      'You like Node, TypeScript, AWS Lambdas, JWTs, microservices and you need to deploy a comprehensive back-end solution. Enter Rapid Back-End by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <RapidBackend />
      <Footer />
    </>
  );
}
