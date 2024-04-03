import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ReactContextApi from '@/components/Articles/ReactContextApi/ReactContextApi';

export function generateMetadata(): Metadata {
  return {
    title: 'React Context-Api and Lazy-loading: Naeem Gitonga',
    description:
      'An overview of React\'s context api with lazy loading by Naeem Gitonga',
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
