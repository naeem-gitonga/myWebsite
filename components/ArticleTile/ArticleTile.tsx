'use client';
import styles from './ArticleTile.module.css';

type ArticleTileProps = {
  article: {
    title: string;
    imageUrl: string;
    lengthInMinutes: number;
    publishedDate: string;
    articleUrl: string;
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
    },
  } = props;
  const handleClick = (e: any) => {
    window.open(articleUrl, '_blank');
    console.log('you are clicking the tile');
  };
  return (
    <div onClick={handleClick} className={tileWrapper}>
      <div
        className={imageContainer}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          <p className={lengthInMinutes}>{lim} min read</p>
          <p className={publishedDate}>{pd}</p>
        </div>
      </div>
    </div>
  );
}
