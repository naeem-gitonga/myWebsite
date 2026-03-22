'use client';
import { useRef, useEffect } from 'react';
import ArticleTile from '../ArticleTile/ArticleTile';
import styles from './ArticleTileView.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import ReturnArrow from '../ReturnArrow/ReturnArrow';
import PageHeader from '../PageHeader/PageHeader';
import SubscriberBanner from '../SubscriberBanner/SubscriberBanner';
import { articles } from '@/utils/articles';

type ArticleTileViewProps = { sharedHeader: boolean; confirmed?: boolean };

const loopedArticles = [...articles, ...articles, ...articles];

export default function ArticleTileView(
  props: ArticleTileViewProps
): React.JSX.Element {
  const { sharedHeader, confirmed } = props;
  const { viewWrapper, articlesWrapper, slotWindow, slotScroll } = styles;
  const { sectionHeader } = sharedStyles;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight / 3;
    });

    const handleScroll = () => {
      const third = el.scrollHeight / 3;
      if (el.scrollTop < third) {
        el.scrollTop += third;
      } else if (el.scrollTop > third * 2) {
        el.scrollTop -= third;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="articles" className={articlesWrapper}>
      {sharedHeader ? (
        <PageHeader hideLinks={false} headerName="myArticles" />
      ) : (
        <h2 className={sectionHeader}>myArticles</h2>
      )}
      <SubscriberBanner subscribed={confirmed} />
      <div className={slotWindow}>
        <div className={slotScroll} ref={scrollRef}>
          <div className={viewWrapper}>
            {loopedArticles.map((a: any, i: number) => (
              <ArticleTile article={a} key={`${i}-${a.title}`} noTarget />
            ))}
          </div>
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
