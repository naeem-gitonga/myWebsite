import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import DefaultParameters from '@/components/Articles/DefaultParameters/DefaultParameters';

export function generateMetadata(): Metadata {
  return {
    title: "Are JavaScript's default parameters slowing me down?",
    description:
      'Learn how JavaScript default parameters affect code execution time by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <DefaultParameters />
      <Footer />
    </>
  );
}
