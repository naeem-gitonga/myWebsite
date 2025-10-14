import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import GitlabToGithubMirrors from '@/components/Articles/GitlabToGithubMirrors/GitlabToGithubMirrors';

export function generateMetadata(): Metadata {
  return {
    title: 'Gitlab to Github Mirrors (PUSH): Naeem Gitonga',
    description:
      'Documentation, how to, step by step guide for Gitlab to github mirror by Naeem Gitonga',
  };
}

export default function Article(): JSX.Element {
  return (
    <>
      <GitlabToGithubMirrors />
      <Footer />
    </>
  );
}
