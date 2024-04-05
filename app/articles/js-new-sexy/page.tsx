import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import JSNS from '@/components/Articles/JSNS/JSNS';

export function generateMetadata(): Metadata {
  return {
    title: "JavaScript's New Sexy: TypeScript a Developer's Tool",
    description:
      "Learn how TypeScript functions as a developer's tool to use in any application where JavaScript is involved. Naeem Gitonga",
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <JSNS />
      <Footer />
    </>
  );
}
