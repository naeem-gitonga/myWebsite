# Article Template (Codex Instructions)

Use this template when creating a new article in this repo.

## Source Content
- Read the source document for the article (usually a `.docx` in `app/articles/<slug>/`).
- Extract the key points and outline the sections before writing the React component.

## Structure to Follow
Use an existing article (e.g. `regulated-compute`) as the style and folder structure guide.

### Required files
- `app/articles/<slug>/page.tsx`
- `components/Articles/<ArticleName>/<ArticleName>.tsx`
- `app/articles/<slug>/tests/page.test.tsx`
- Update `utils/articles.ts`
- Update `utils/articleImages.ts`

### Recommended layout
- `PageHeader` at top
- `ArticleDateTime` under the title (driven by `utils/articles.ts`)
- Hero image with `LazyImage`
- Sections with `h2`, paragraphs with `p`
- Optional images embedded near relevant sections
- Tags at the bottom
- `ReturnArrow` after content

## Metadata
- Add metadata in `app/articles/<slug>/page.tsx` with:
  - `title`, `description`, `keywords`
  - OpenGraph and Twitter metadata
  - `publishedTime`
- Use OG images sized to 1200x627 with consistent naming.

## Images
- Store source images in `pictures/` and export to `public/images/`.
- Use `.webp` for in-article images.
- Create OG images in `public/images/` with `*-og` naming.
- If an image is too wide or unreadable, crop or resize and update dimensions in `LazyImage`.

## Links
- Add internal links where relevant (e.g., `/articles/regulated-compute`).

## Tests
- Keep the metadata test resilient:
  - Check title is a non-empty string
  - Ensure OpenGraph and Twitter titles match the main title

## Example Snippets

### Article page
```tsx
import type { Metadata } from 'next';

import Footer from 'components/Footer/Footer';
import ArticleComponent from '@/components/Articles/<ArticleName>/<ArticleName>';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';

export function generateMetadata(): Metadata {
  const title = '<Article Title>';
  const description = '<Short description>'; 
  const imageUrl = getAbsoluteUrl('/images/<og-image>-og.webp');
  const pageUrl = getAbsoluteUrl('/articles/<slug>');

  return {
    title,
    description,
    keywords: ['tag1', 'tag2'],
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 627,
        alt: '<alt text>',
        type: 'image/webp',
      }],
      type: 'article',
      authors: [siteConfig.author],
      publishedTime: '<ISO date>',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
```

### Article component
```tsx
'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function <ArticleName>(): React.JSX.Element {
  const { innerWrapper, imageWrapper, altText, text } = articleStyles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="<slug>" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1><Article Title></h1>
        <ArticleDateTime imageUrl="<imageKey>" />
        <div className={imageWrapper}>
          <LazyImage
            alt="<alt>"
            loader={imageLoader}
            src="/images/<hero>.webp"
            width={1200}
            height={800}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}><caption></p>
        </div>

        <p className={text}>First paragraph...</p>

        <div className={minus10LeftMargin}>
          <Tags tags={['tag1', 'tag2']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
```

### Metadata test (resilient)
```tsx
it('generates metadata', () => {
  const metadata = generateMetadata();
  expect(metadata.title).toEqual(expect.any(String));
  expect((metadata.title as string).length).toBeGreaterThan(0);
  expect(metadata.openGraph?.title).toBe(metadata.title);
  expect(metadata.twitter?.title).toBe(metadata.title);
});
```
