import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import GitlabToGithubMirrors from '@/components/Articles/GitlabToGithubMirrors/GitlabToGithubMirrors';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export function generateMetadata(): Metadata {
  return {
    title: 'Gitlab to Github Mirrors (PUSH): Naeem Gitonga',
    description:
      'Documentation, how to, step by step guide for Gitlab to github mirror by Naeem Gitonga',
  };
}

export default async function Article(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <GitlabToGithubMirrors />
      <Footer />
    </>
  );
}
