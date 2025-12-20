import { fireEvent, render, screen } from '@testing-library/react';
import AddToCartMessage from '../AddToCartMessage';
import type { Product } from '@/types/product';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

jest.mock('../../SmallItemPreview/SmallItemPreview', () => ({
  __esModule: true,
  default: () => <div data-testid="small-item-preview" />,
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

describe('AddToCartMessage', () => {
  it('renders message when item exists', () => {
    const setModalOpen = jest.fn();
    render(
      <AddToCartMessage setModalOpen={setModalOpen} lastItemClicked={product} />
    );
    expect(screen.getByText(/added an item/i)).toBeInTheDocument();
    expect(screen.getByTestId('small-item-preview')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Go to cart'));
    fireEvent.click(screen.getByText('Continue Shopping'));
    expect(setModalOpen).toHaveBeenCalledTimes(2);
  });

  it('returns null when no last item is provided', () => {
    const { container } = render(
      <AddToCartMessage setModalOpen={jest.fn()} lastItemClicked={null} />
    );
    expect(container.firstChild).toBeNull();
  });
});
