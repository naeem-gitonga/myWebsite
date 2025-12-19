import { siteConfig, getAbsoluteUrl } from '../siteConfig';

describe('siteConfig', () => {
  it('has the correct site name', () => {
    expect(siteConfig.siteName).toBe('Naeem Gitonga');
  });

  it('has the correct author', () => {
    expect(siteConfig.author).toBe('Naeem Gitonga');
  });

  it('has a baseUrl defined', () => {
    expect(siteConfig.baseUrl).toBeDefined();
    expect(typeof siteConfig.baseUrl).toBe('string');
  });
});

describe('getAbsoluteUrl', () => {
  it('returns full URL for path starting with /', () => {
    const result = getAbsoluteUrl('/articles/test');
    expect(result).toBe(`${siteConfig.baseUrl}/articles/test`);
  });

  it('normalizes path without leading slash', () => {
    const result = getAbsoluteUrl('images/test.jpg');
    expect(result).toBe(`${siteConfig.baseUrl}/images/test.jpg`);
  });

  it('handles root path correctly', () => {
    const result = getAbsoluteUrl('/');
    expect(result).toBe(`${siteConfig.baseUrl}/`);
  });

  it('returns valid URL format', () => {
    const result = getAbsoluteUrl('/test');
    expect(result).toMatch(/^https?:\/\//);
  });

  it('does not double-slash paths', () => {
    const result = getAbsoluteUrl('/path');
    expect(result).not.toContain('//path');
  });
});
