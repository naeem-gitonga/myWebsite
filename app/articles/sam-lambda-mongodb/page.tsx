import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import SamLambdaMongoDB from '@/components/Articles/SamLambdaMongoDB/SamLambdaMongoDB';

export function generateMetadata(): Metadata {
  return {
    title:
      'Deploy GoLang Lambda With MongoDB using AWS SAM (Part 3) by Naeem Gitonga',
    description:
      'Learn how to deploy an AWS lambda with a Golang runtime using AWS SAM by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <SamLambdaMongoDB />
      <Footer />
    </>
  );
}
