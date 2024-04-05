import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ExplainServers from '@/components/Articles/ExplainServers/ExplainServers';

export function generateMetadata(): Metadata {
  return {
    title: 'Explain Servers to a 5 Year Old by Naeem Gitonga',
    description: 'Learn the basics about web servers by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <ExplainServers />
      <Footer />
    </>
  );
}
