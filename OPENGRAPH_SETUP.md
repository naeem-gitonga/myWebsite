# Open Graph Setup Guide

## What Was Fixed

Your Open Graph images weren't showing because:
1. You were using relative URLs instead of absolute URLs
2. Missing key metadata fields that platforms like WhatsApp require
3. Hardcoded URLs that needed to change per environment

## Environment Variables

### Vercel Environment Variables Setup

You need to add `NEXT_PUBLIC_SITE_URL` to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following:

**For Production:**
- Variable: `NEXT_PUBLIC_SITE_URL`
- Value: `https://www.naeemgitonga.com`
- Environment: Production

**For Staging:**
- Variable: `NEXT_PUBLIC_SITE_URL`
- Value: `https://staging.naeemgitonga.com`
- Environment: Preview

**For Development (already set in .env.local):**
- Variable: `NEXT_PUBLIC_SITE_URL`
- Value: `http://localhost:3000`

## Testing Your Changes

### 1. Local Testing
```bash
npm run dev
# Visit http://localhost:3000/articles/tiger-experience
# View source and look for <meta property="og:image" content="..."/>
```

### 2. After Deployment

**Clear Social Media Caches:**

- **Facebook**: https://developers.facebook.com/tools/debug/
  - Paste your article URL
  - Click "Scrape Again"

- **LinkedIn**: https://www.linkedin.com/post-inspector/
  - Paste your article URL
  - Click "Inspect"

- **WhatsApp**:
  - WhatsApp caches aggressively
  - Try adding `?v=1` to the end of your URL when sharing (e.g., `https://staging.naeemgitonga.com/articles/tiger-experience?v=1`)
  - If still not working after 24 hours, the issue may be image size or format

### 3. Verify Meta Tags

```bash
curl https://staging.naeemgitonga.com/articles/tiger-experience | grep "og:image"
```

Should output:
```html
<meta property="og:image" content="https://staging.naeemgitonga.com/images/tiger-group.png"/>
```

## WhatsApp-Specific Requirements

WhatsApp is picky about Open Graph images:

1. **Image must be publicly accessible** (no authentication required) ✓
2. **Must be absolute URL** (not relative) ✓
3. **Recommended size**: 1200x627 pixels ✓ (you have this)
4. **File size**: Under 300KB (check your images)
5. **Format**: JPG or PNG ✓
6. **Must use HTTPS** ✓

### Check Your Image Sizes

```bash
ls -lh public/images/*.png
```

If images are over 300KB, you may need to compress them.

## Adding Open Graph to More Articles

For any new article, use this template:

```typescript
import type { Metadata } from 'next';
import { getAbsoluteUrl, siteConfig } from '@/lib/siteConfig';

export function generateMetadata(): Metadata {
  const title = "Your Article Title";
  const description = "Your article description";
  const imageUrl = getAbsoluteUrl('/images/your-image.png');
  const pageUrl = getAbsoluteUrl('/articles/your-article-slug');

  return {
    title,
    description,
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
        alt: "Description of your image",
        type: 'image/png',
      }],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
```

## Troubleshooting

**Still not working on WhatsApp?**

1. Check image file size (must be < 300KB)
2. Wait 24-48 hours for WhatsApp's cache to clear
3. Try a different image
4. Check that image is publicly accessible:
   ```bash
   curl -I https://staging.naeemgitonga.com/images/tiger-group.png
   ```
   Should return `HTTP/2 200`

**Image showing but wrong/old image?**

- Clear the social media platform's cache (links above)
- WhatsApp may take up to 7 days to refresh

**Other platforms work but not WhatsApp?**

- WhatsApp has the strictest requirements
- Double-check image file size
- Consider using JPG instead of PNG (better compression)
