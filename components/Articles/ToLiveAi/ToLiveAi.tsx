'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ToLiveAi(): React.JSX.Element {
  const { innerWrapper, text, altText, imageWrapper, subtext } = articleStyles;
  const { tenPadding, width75 } = sharedStyles;

  return (
    <div id="tolive-ai" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>ToLive AI</h1>
        <p className={subtext}>Your Personal AI That Knows You</p>
        <ArticleDateTime imageUrl="toliveai" />
        <div className={imageWrapper}>
          <LazyImage
            alt="ToLive AI architectural diagram"
            src="/images/tolive-architectural-diagram.webp"
            width={720}
            height={783}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}>ToLive AI architectural diagram</p>
        </div>

        <p className={text}>ToLive AI is a private, intelligent assistant.</p>
        <p className={text}>
          Write your thoughts, upload documents, and chat with an AI that
          understands you, has the context, and is grounded in your own words.
        </p>
        <p className={text}>Build your personal knowledge base now!</p>
        <p className={text}>
          Stack: Bedrock, Lambda, LanceDB, API Gateway, EventBridge, Route 53,
          S3, and Next.js.
        </p>
        <p className={text}>
          <a href="https://tolive.ai" target="_blank" rel="noreferrer">
            Click here
          </a>{' '}
          to be directed to https://tolive.ai.
        </p>
      </div>
      <ReturnArrow />
    </div>
  );
}
