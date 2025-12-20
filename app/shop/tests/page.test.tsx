import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Shop, { generateMetadata } from '../page';

jest.mock('@/components/ShopView/ShopView', () => ({
  __esModule: true,
  default: () => <div data-testid="shop-view" />,
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

describe('shop page', () => {
  it('renders shop view and analytics', async () => {
    const element = await Shop({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('shop-view')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Shop({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Shop');
  });
});
