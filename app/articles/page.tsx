import Footer from 'components/Footer/Footer';
import '../globals.css';
import ArticleTileView from 'components/ArticleTileView/ArticleTileView';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'React Context-Api and Lazy-loading: Naeem Gitonga',
    description:
      'An overview of React\'s context api with lazy loading. Naeem Gitonga',
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
