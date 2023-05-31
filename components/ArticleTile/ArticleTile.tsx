'use client';
import { MouseEventHandler } from 'react';
import styles from './ArticleTile.module.css';

type ArticleTileProps = {
  article: {
    title: string;
    imageUrl: string;
    lengthInMinutes: number;
    publishedDate: string;
    articleUrl: string;
    isBook?: boolean;
    type?: string;
  };
};

export default function ArticleTile(props: ArticleTileProps): JSX.Element {
  const {
    tileWrapper,
    title,
    titleBox,
    imageContainer,
    publishedDate,
    infoWrapper,
    lengthInMinutes,
  } = styles;
  const {
    article: {
      title: t,
      imageUrl,
      articleUrl,
      lengthInMinutes: lim,
      publishedDate: pd,
      isBook,
      type,
    },
  } = props;
  const handleClick = (_e: MouseEventHandler<HTMLDivElement> | undefined) => {
    window.open(articleUrl, '_blank');
  };
  return (
    <div
      onClick={handleClick as unknown as MouseEventHandler}
      className={tileWrapper}
    >
      <div
        className={imageContainer}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          {!isBook ? (
            <p className={lengthInMinutes}>{lim} min read</p>
          ) : (
            <p className={lengthInMinutes}>{type}</p>
          )}
          <p className={publishedDate}>{pd}</p>
        </div>
      </div>
    </div>
  );
}
