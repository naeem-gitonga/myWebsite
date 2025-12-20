import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Item, { generateMetadata } from '../page';

jest.mock('@/components/ItemView/ItemView', () => ({
  __esModule: true,
  default: () => <div data-testid="item-view" />,
}));

jest.mock('@/components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/components/Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: ({ fromWebsite, itemId }: { fromWebsite: string; itemId?: string }) => (
    <div data-testid="analytics">
      {fromWebsite}:{itemId ?? 'none'}
    </div>
  ),
}));

jest.mock('@/utils/products', () => ({
  products: [
    {
      id: 1,
      title: 'Test Item',
      description: '<p>Hello World</p>',
    },
  ],
}));

describe('item page', () => {
  it('renders item view and analytics', async () => {
    const element = await Item({
      searchParams: Promise.resolve({ fromWebsite: 'ref', item_id: '1' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref:1');
    expect(getByTestId('item-view')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Item({
      searchParams: Promise.resolve({ item_id: '1' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct:1');
  });

  it('generates metadata from product', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ item_id: '1' }),
      searchParams: Promise.resolve({ item_id: '1' }),
    } as any, {} as any);
    expect(metadata.title).toBe('Test Item by Naeem Gitonga');
    expect(metadata.description).toContain('Hello World');
  });
});
