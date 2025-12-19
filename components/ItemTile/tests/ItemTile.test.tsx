import { render, screen, fireEvent } from '@testing-library/react';
import ItemTile from '../ItemTile';
import type { Product } from '../../../types/product';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock AddToCartButton
jest.mock('@/components/AddToCartButton/AddToCartButton', () => ({
  __esModule: true,
  default: ({ product, addToCart }: { product: Product; addToCart: (p: Product) => void }) => (
    <button data-testid="add-to-cart" onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  ),
}));

// Mock Price component
jest.mock('@/components/Price/Price', () => ({
  __esModule: true,
  default: ({ price, promotion }: { price: number; promotion: number }) => (
    <span data-testid="price">
      ${promotion > 0 ? promotion : price}
    </span>
  ),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  imageUrl: 'pylcover',
  productUrl: '/item?item_id=1',
  price: 29.99,
  description: 'A test product',
  promotion: 0,
  emailTemplate: '',
  isbn: '123-456',
  publishedOn: '2024-01-01',
  show: true,
  emailTemplateHtml: '',
  s3Url: '',
  calendlyLink: false,
  previewLink: '',
  imageUrlItemView: '/images/test.webp',
};

describe('ItemTile', () => {
  const mockAddToCart = jest.fn();
  const mockOpenModal = jest.fn();
  const mockSetLastItemClicked = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product title', () => {
    render(
      <ItemTile
        product={mockProduct}
        addToCart={mockAddToCart}
        openModal={mockOpenModal}
        setLastItemClicked={mockSetLastItemClicked}
      />
    );
    expect(screen.getByRole('heading', { name: 'Test Product' })).toBeInTheDocument();
  });

  it('renders link to product page', () => {
    render(
      <ItemTile
        product={mockProduct}
        addToCart={mockAddToCart}
        openModal={mockOpenModal}
        setLastItemClicked={mockSetLastItemClicked}
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/item?item_id=1');
  });

  it('renders the price component', () => {
    render(
      <ItemTile
        product={mockProduct}
        addToCart={mockAddToCart}
        openModal={mockOpenModal}
        setLastItemClicked={mockSetLastItemClicked}
      />
    );
    expect(screen.getByTestId('price')).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    render(
      <ItemTile
        product={mockProduct}
        addToCart={mockAddToCart}
        openModal={mockOpenModal}
        setLastItemClicked={mockSetLastItemClicked}
      />
    );
    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
  });

  it('calls addToCart when add to cart button is clicked', () => {
    render(
      <ItemTile
        product={mockProduct}
        addToCart={mockAddToCart}
        openModal={mockOpenModal}
        setLastItemClicked={mockSetLastItemClicked}
      />
    );
    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
