import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import GitlabToGithubMirrors from '@/components/Articles/GitlabToGithubMirrors/GitlabToGithubMirrors';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = 'Gitlab to Github Mirrors (PUSH)';
  const description = 'Documentation, how to, step by step guide for Gitlab to github mirror by Naeem Gitonga';
  const imageUrl = getAbsoluteUrl('/images/gitlab-mirror-og.jpg');
  const pageUrl = getAbsoluteUrl('/articles/gitlab-to-github-mirrors');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 627,
        alt: title,
        type: 'image/jpeg',
      }],
      type: 'article',
      authors: [siteConfig.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
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
