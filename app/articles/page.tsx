import Footer from 'components/Footer/Footer';
import '../globals.css';
import ArticleTileView from 'components/ArticleTileView/ArticleTileView';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'My Articles',
    description:
      'Explore the blog of Naeem Gitonga as he shares his learnings in software engineering and DevOps. Naeem Gitonga',
  };
}

export default async function Blog(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ArticleTileView sharedHeader />
      <Footer />
    </>
  );
}
