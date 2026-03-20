'use client';
import ArticleTile from '../ArticleTile/ArticleTile';
import styles from './ArticleTileView.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import ReturnArrow from '../ReturnArrow/ReturnArrow';
import PageHeader from '../PageHeader/PageHeader';
import SubscriberBanner from '../SubscriberBanner/SubscriberBanner';
import { articles } from '@/utils/articles';

type ArticleTileViewProps = { sharedHeader: boolean; confirmed?: boolean };

export default function ArticleTileView(
  props: ArticleTileViewProps
): React.JSX.Element {
  const { sharedHeader, confirmed } = props;
  const { viewWrapper, articlesWrapper } = styles;
  const { sectionHeader } = sharedStyles;

  return (
    <div id="articles" className={articlesWrapper}>
      {sharedHeader ? (
        <PageHeader hideLinks={false} headerName="myArticles" />
      ) : (
        <h2 className={sectionHeader}>myArticles</h2>
      )}
      <SubscriberBanner subscribed={confirmed} />
      <div className={viewWrapper}>
        {articles.map((a: any) => {
          return <ArticleTile article={a} key={a.title} noTarget />;
        })}
      </div>
      <ReturnArrow />
    </div>
  );
}
