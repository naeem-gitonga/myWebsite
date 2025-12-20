import { fireEvent, render, screen } from '@testing-library/react';
import AddToCartButton from '../AddToCartButton';
import type { Product } from '@/types/product';

jest.mock('../../Modal/Modal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/hooks/useModal', () => ({
  __esModule: true,
  default: () => [false, jest.fn()],
}));

jest.mock('../../AddToCartMessage/AddToCartMessage', () => ({
  __esModule: true,
  default: () => <div data-testid="add-to-cart-message" />,
}));

const product: Product = {
  id: 1,
  title: 'Test Product',
  imageUrl: 'img',
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
};

describe('AddToCartButton', () => {
  it('adds to cart and pushes analytics event', () => {
    const addToCart = jest.fn();
    (window as any).dataLayer = { push: jest.fn() };
    render(
      <AddToCartButton className="btn" product={product} addToCart={addToCart} />
    );
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(addToCart).toHaveBeenCalledWith(product);
    expect((window as any).dataLayer.push).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'product_added_to_cart',
        item: 'Test Product',
      })
    );
    expect(screen.getByTestId('add-to-cart-message')).toBeInTheDocument();
  });
});
