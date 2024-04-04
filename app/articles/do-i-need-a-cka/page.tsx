import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import CKA from '@/components/Articles/CKA/CKA';

export function generateMetadata(): Metadata {
  return {
    title: 'Do I really need a CKA certification?: Naeem Gitonga',
    description:
      'Why Naeem Gitonga decided to pursue the Certified Kubernetes Administrator certificate and what he learned in the process by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <CKA />
      <Footer />
    </>
  );
}
