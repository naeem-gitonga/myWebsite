import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Cart, { generateMetadata } from '../page';

jest.mock('@/components/CartView/CartView', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-view" />,
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

describe('cart page', () => {
  it('renders cart view and analytics', async () => {
    const element = await Cart({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('cart-view')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Cart({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Cart');
  });
});
