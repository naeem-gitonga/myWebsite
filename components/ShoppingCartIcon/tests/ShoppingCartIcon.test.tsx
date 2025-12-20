import { render, screen, waitFor } from '@testing-library/react';
import ShoppingCartIcon from '../ShoppingCartIcon';
import type CartItem from '@/types/cart-item';

jest.mock('@fortawesome/react-fontawesome', () => ({
  __esModule: true,
  FontAwesomeIcon: (props: Record<string, unknown>) => (
    <i data-testid="fa" {...props} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const item: CartItem = {
  id: 1,
  title: 'Test',
  imageUrl: 'test',
  productUrl: '/item?item_id=1',
  price: 10,
  description: 'desc',
  promotion: 0,
  emailTemplate: '',
  isbn: '123',
  publishedOn: '2024',
  show: true,
  emailTemplateHtml: '',
  s3Url: '',
  calendlyLink: false,
  previewLink: '',
  imageUrlItemView: '/images/test.webp',
  quantity: 2,
};

describe('ShoppingCartIcon', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    localStorage.clear();
  });

  it('hides cart icon when shop is disabled', () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SHOW_SHOP: 'false' };
    const { container } = render(
      <ShoppingCartIcon unsetPosition={false} fill="black" />
    );
    expect(container.querySelector('a')).toBeNull();
  });

  it('shows cart icon and item count', async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SHOW_SHOP: 'true' };
    localStorage.setItem('cart-jng', JSON.stringify([item]));

    render(<ShoppingCartIcon unsetPosition fill="black" />);

    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/cart');
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('renders without count when cart is empty', async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_SHOW_SHOP: 'true' };
    render(<ShoppingCartIcon unsetPosition={false} fill="black" />);
    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/cart');
    });
    expect(screen.queryByText('0')).toBeNull();
  });
});
