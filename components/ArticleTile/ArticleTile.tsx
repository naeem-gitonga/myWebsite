'use client';

import { useState } from 'react';
import Link from 'next/link';

import LazyImage from '@/components/LazyImage/LazyImage';
import {
  articleTileImageFallback,
  articleTileImages,
} from '@/utils/articleImages';

import styles from './ArticleTile.module.scss';

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
  noTarget?: boolean;
};

export default function ArticleTile(props: ArticleTileProps): React.JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    tileWrapper,
    title,
    titleBox,
    imageContainer,
    publishedDate,
    infoWrapper,
    lengthInMinutes,
    placeholderOverlay,
    placeholderHidden,
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
    noTarget,
  } = props;

  const tileImageSrc =
    articleTileImages[imageUrl] ?? articleTileImageFallback;
  const overlayClasses = `${placeholderOverlay}${
    imageLoaded ? ` ${placeholderHidden}` : ''
  }`;

  return (
    <Link
      href={articleUrl}
      className={tileWrapper}
      target={noTarget ? '_self' : '_blank'}
    >
      <div className={overlayClasses} aria-hidden="true" />
      <div className={imageContainer}>
        <LazyImage
          alt={`Cover image for ${t}`}
          src={tileImageSrc}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          style={{ objectFit: 'cover' }}
          onLoadingComplete={() => setImageLoaded(true)}
          placeholder="empty"
        />
      </div>
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
    </Link>
  );
}
