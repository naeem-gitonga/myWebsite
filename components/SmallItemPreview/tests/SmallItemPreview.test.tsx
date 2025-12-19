import { render, screen } from '@testing-library/react';
import SmallItemPreview from '../SmallItemPreview';
import type CartItem from '@/types/cart-item';

jest.mock('../../CounterInput/CounterInput', () => ({
  __esModule: true,
  default: () => <div data-testid="counter-input" />,
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

describe('SmallItemPreview', () => {
  it('renders item and optional counter', () => {
    const styles = {
      imageContainer: 'imageContainer',
      itemDescription: 'itemDescription',
      smallItemPreviewWrapper: 'smallItemPreviewWrapper',
      imageWrapper: 'imageWrapper',
      quantity: 'quantity',
    };

    const { rerender } = render(
      <SmallItemPreview styles={styles} item={item} showCounter />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByTestId('counter-input')).toBeInTheDocument();

    rerender(
      <SmallItemPreview styles={styles} item={item} showCounter={false} />
    );
    expect(screen.queryByTestId('counter-input')).toBeNull();
  });
});
