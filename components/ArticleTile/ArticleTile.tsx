import styles from './ArticleTile.module.scss';
import Link from 'next/link';

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
    noTarget,
  } = props;

  return (
    <Link
      href={articleUrl}
      className={tileWrapper}
      target={noTarget ? '_self' : '_blank'}
    >
      <div className={`${imageContainer} ${styles[imageUrl]}`} />
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
