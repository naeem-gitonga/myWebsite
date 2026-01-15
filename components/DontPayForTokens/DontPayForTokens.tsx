'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import Link from 'next/link';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function DontPayForTokens(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    pre,
    subtext,
    table,
    gatedWrapper,
    gatedContent,
    gatedOverlay,
    gatedOverlayInner,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="dont-pay-for-tokens" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>I Don&apos;t Pay For Tokens</h1>
        <p className={subtext}>The Difference Between Using AI and Building AI</p>
        <ArticleDateTime imageUrl={'dontpaytokens'} />
        <div className={imageWrapper}>
          <LazyImage
            alt="AI generated portrait"
            loader={imageLoader}
            src="/images/ai-generated-image.webp"
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>AI generated image</p>
        </div>
        <h2>A Conversation That Revealed a Knowledge Gap</h2>
        <p className={text}>
          &ldquo;So it cost you $700 because of the tokens?&rdquo;
        </p>
        <p className={text}>
          This question from a technology management consultant stopped me cold.
          I had just explained that producing a 6-minute demo video of my
          AI-powered application cost $700. His assumption&mdash;that I was
          paying per-token to some AI provider&mdash;revealed a fundamental
          misunderstanding about what I had built.
        </p>
        <p className={text}>
          &ldquo;No,&rdquo; I explained. &ldquo;I don&apos;t pay for tokens. I
          built my own AI. My cost is compute&mdash;$50 per hour for the GPU
          servers that run my models.&rdquo;
        </p>
        <p className={text}>
          His response: &ldquo;Yeah, we have an API key that we use to hit a
          server and interact with AI.&rdquo;
        </p>
        <div className={gatedWrapper}>
          <div className={gatedContent}>
            <p className={text}>
              Maybe he didn&apos;t understand the significance of what I had built.
              Even after I explicitly stated that I had built my own AI, he seemed
              only knowledgable of consuming someone else&apos;s. This wasn&apos;t a
              failure of explanation&mdash;it was a gap in understanding that
              exists across much of the technology industry. If a technology
              consultant doesn&apos;t grasp the distinction, how many others share
              this blind spot?
            </p>
          </div>
          <div className={gatedOverlay}>
            <div className={gatedOverlayInner}>
              <Link href="/shop">purchase this article here</Link>
            </div>
          </div>
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
