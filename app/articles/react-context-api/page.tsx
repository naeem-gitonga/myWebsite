import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReactContextApi from '@/components/Articles/ReactContextApi/ReactContextApi';

function generateMetadata(): Metadata {
  return {
    title: 'React Context-Api and Lazy-loading: Naeem Gitonga',
    description:
      'You like Node, TypeScript, AWS Lambdas, JWTs, microservices and you need to deploy a comprehensive back-end solution. Enter Rapid Back-End. Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <ReactContextApi />
      <Footer />
    </>
  );
}
