import { render, screen } from '@testing-library/react';
import ItemView from '../ItemView';

const mockUseSearchParams = jest.fn();
const mockPush = jest.fn();
const mockUseBreakpoint = jest.fn();
const mockUseCart = jest.fn();
const mockCanBeParsedToInt = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('../../../hooks/useBreakpoint', () => ({
  __esModule: true,
  default: () => mockUseBreakpoint(),
}));

jest.mock('../../../hooks/useCart', () => ({
  __esModule: true,
  default: () => mockUseCart(),
}));

jest.mock('../../../utils/canBeparsedToInt', () => ({
  __esModule: true,
  default: (value: string) => mockCanBeParsedToInt(value),
}));

jest.mock('../../../utils/products', () => ({
  products: [
    {
      id: 1,
      title: 'Test Item',
      imageUrl: 'img',
      imageUrlItemView: '/images/test.webp',
      price: 10,
      promotion: 0,
      description: '<p>desc</p>',
      isbn: '123',
      publishedOn: '2024',
      previewLink: 'https://example.com/sample',
    },
  ],
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

jest.mock('../../AddToCartButton/AddToCartButton', () => ({
  __esModule: true,
  default: () => <div data-testid="add-to-cart" />,
}));

jest.mock('../../Price/Price', () => ({
  __esModule: true,
  default: () => <div data-testid="price" />,
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('ItemView', () => {
  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('item_id=1'));
    mockUseCart.mockReturnValue([jest.fn(), [], jest.fn(), jest.fn()]);
  });

  it('renders desktop layout with download link', () => {
    mockUseBreakpoint.mockReturnValue('lg');
    mockCanBeParsedToInt.mockReturnValue([true, 1]);
    render(<ItemView />);

    expect(screen.getByTestId('page-header')).toHaveTextContent('item');
    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('renders mobile layout and redirects when id invalid', () => {
    mockUseBreakpoint.mockReturnValue('sm');
    mockCanBeParsedToInt.mockReturnValue([false, 1]);
    render(<ItemView />);

    expect(mockPush).toHaveBeenCalledWith('/shop');
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
});
