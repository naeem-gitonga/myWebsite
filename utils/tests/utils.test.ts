import canBeParsedToInt from '../canBeparsedToInt';
import getHref from '../getHref';
import { imageLoader } from '../imageLoader';
import roundToTwoDecimalPlaces from '../roundTonearestTwoDecimal';
import { truncateStringWithEllipsis } from '../truncateString';
import { articleTileImages } from '../articleImages';
import { articles } from '../articles';

describe('utils', () => {
  it('parses integers safely', () => {
    expect(canBeParsedToInt('123')).toEqual([true, 123]);
    expect(canBeParsedToInt('123abc')).toEqual([false, 123]);
    expect(canBeParsedToInt('abc')).toEqual([false, NaN]);
  });

  it('builds interstitial hrefs', () => {
    expect(getHref('https://example.com?where=Test')).toBe(
      '/interstitial?url=https://example.com&siteName=Test'
    );
    expect(getHref('https://example.com&where=Test')).toBe(
      '/interstitial?url=https://example.com&siteName=Test'
    );
    expect(getHref('https://example.com')).toBe('');
  });

  it('generates image loader urls', () => {
    expect(imageLoader({ src: '/img.png', width: 400, quality: 50 })).toBe(
      '/img.png?w=400&q=50'
    );
    expect(imageLoader({ src: '/img.png', width: 400 })).toBe(
      '/img.png?w=400&q=75'
    );
  });

  it('rounds to two decimal places', () => {
    expect(roundToTwoDecimalPlaces(10)).toBe(10);
    expect(roundToTwoDecimalPlaces(10.236)).toBe(10.24);
  });

  it('truncates and removes paragraph tags', () => {
    const long = `<p>${'a'.repeat(200)}</p>`;
    const result = truncateStringWithEllipsis(long);
    expect(result.endsWith('...')).toBe(true);
    expect(result.includes('<p>')).toBe(false);
  });

  it('exposes article images and metadata', () => {
    expect(articleTileImages.reactcontext).toBe('/images/react-context.webp');
    expect(articles[articles.length - 1].title).toBe('React Context-Api and Lazy-loading');
  });
});

describe('siteConfig', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('uses default base url when env is missing', async () => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_SITE_URL;
    jest.resetModules();
    const { siteConfig, getAbsoluteUrl } = await import('../siteConfig');

    expect(siteConfig.baseUrl).toBe('https://www.naeemgitonga.com');
    expect(getAbsoluteUrl('test')).toBe('https://www.naeemgitonga.com/test');
  });

  it('uses env base url when provided', async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SITE_URL: 'https://example.com' };
    jest.resetModules();
    const { siteConfig, getAbsoluteUrl } = await import('../siteConfig');

    expect(siteConfig.baseUrl).toBe('https://example.com');
    expect(getAbsoluteUrl('/test')).toBe('https://example.com/test');
  });
});

describe('products', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('exposes product list with consultation entry', async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SHOW_CONSULT: 'true' };
    jest.resetModules();
    const { products } = await import('../products');

    expect(products).toHaveLength(4);
    expect(products[0].id).toBe(1);
    expect(products[3].title).toBe('1-Hour Consultation');
    expect(products[3].show).toBe('true');
  });
});
