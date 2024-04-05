import { articles } from '@/utils/articles';
import styles from './ArticleDateTime.module.scss';

type ArticleDateTimeProps = { imageUrl: string };
export function ArticleDateTime(props: ArticleDateTimeProps): JSX.Element {
  const index = articles.findIndex((a) => a.imageUrl === props.imageUrl);
  const article = articles[index];
  const { wrapper, dot } = styles;
  return (
    <div className={wrapper}>
      <p>{article.lengthInMinutes} min read</p>
      <div className={dot}>
        <span>·</span>
      </div>
      <p>{article.publishedDate}</p>
    </div>
  );
}
