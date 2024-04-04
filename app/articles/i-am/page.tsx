import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AWSIAM from '@/components/Articles/AWSIAM/AWSIAM';

export function generateMetadata(): Metadata {
  return {
    title: 'AWS IAM — Quick Dive/Quick Guide: Naeem Gitonga',
    description:
      'Quick dive into AWS Identity and Access Management (IAM) by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <AWSIAM />
      <Footer />
    </>
  );
}
