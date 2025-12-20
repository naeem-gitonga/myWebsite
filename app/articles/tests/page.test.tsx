import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Articles, { generateMetadata } from '../page';

jest.mock('@/components/ArticleTileView/ArticleTileView', () => ({
  __esModule: true,
  default: () => <div data-testid="article-tiles" />,
}));

jest.mock('@/components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/components/Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: ({ fromWebsite }: { fromWebsite: string }) => (
    <div data-testid="analytics">{fromWebsite}</div>
  ),
}));

describe('articles page', () => {
  it('renders article view and analytics', async () => {
    const element = await Articles({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('article-tiles')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Articles({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('My Articles');
  });
});
