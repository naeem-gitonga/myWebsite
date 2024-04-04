import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import DefaultParameters from '@/components/Articles/DefaultParameters/DefaultParamters';

export function generateMetadata(): Metadata {
  return {
    title: "Are JavaScript's default parameters slowing me down?",
    description:
      'Why Naeem Gitonga decided to pursue the Certified Kubernetes Adminostrator certificate and what he learned in the process by Naeem Gitonga',
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
