import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import AboutMe from '@/components/AboutMe/AboutMe';

export function generateMetadata(): Metadata {
  return {
    title: 'About Naeem Gitonga',
    description:
      'Learn about the man, the leader, the engineer who is Jaha Naeem Gitonga by Naeem Gitonga.',
  };
}

export default function About(): JSX.Element {
  return (
    <>
      <AboutMe />
      <Footer />
    </>
  );
}
