import Footer from 'components/Footer/Footer';
import '../globals.css';
import ArticleTileView from 'components/ArticleTileView/ArticleTileView';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'My Articles',
    description:
      'Explore the blog of Naeem Gitonga as he shares his learnings in software engineering and DevOps. Naeem Gitonga',
  };
}

export default function Blog(): JSX.Element {
  return (
    <>
      <ArticleTileView sharedHeader />
      <Footer />
    </>
  );
}
