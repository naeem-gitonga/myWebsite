import { render, screen, waitFor } from '@testing-library/react';
import CartView from '../CartView';
import type CartItem from '@/types/cart-item';

const mockUseCart = jest.fn();
const mockUseModal = jest.fn();
const mockLoadPaypal = jest.fn();
const mockCreateCartForPaypal = jest.fn();
const mockCallInternal = jest.fn();

jest.mock('../../../hooks/useCart', () => ({
  __esModule: true,
  default: () => mockUseCart(),
}));

jest.mock('../../../hooks/useModal', () => ({
  __esModule: true,
  default: () => mockUseModal(),
}));

jest.mock('../../../utils/paypal', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockLoadPaypal(...args),
  createCartForPaypal: (...args: unknown[]) => mockCreateCartForPaypal(...args),
  callInternalFulfillmentApi: (...args: unknown[]) => mockCallInternal(...args),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('../../SmallItemPreview/SmallItemPreview', () => ({
  __esModule: true,
  default: () => <div data-testid="small-item-preview" />,
}));

jest.mock('../../LoadingDots/LoadingDots', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-dots" />,
}));

jest.mock('../../Modal/Modal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../PaymentResponseMessage/PaymentResponseMessage', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-response" />,
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

describe('CartView', () => {
  beforeEach(() => {
    mockUseModal.mockReturnValue([false, jest.fn()]);
    mockLoadPaypal.mockClear();
    mockCreateCartForPaypal.mockClear();
  });

  it('renders empty cart state', () => {
    mockUseCart.mockReturnValue([jest.fn(), [], jest.fn(), jest.fn()]);
    render(<CartView />);

    expect(screen.getByTestId('page-header')).toHaveTextContent('cart');
    expect(screen.getByText('Click here to add items')).toBeInTheDocument();
    expect(mockLoadPaypal).not.toHaveBeenCalled();
  });

  it('loads paypal when cart has items', async () => {
    mockUseCart.mockReturnValue([jest.fn(), [item], jest.fn(), jest.fn()]);
    mockCreateCartForPaypal.mockReturnValue([
      [{ reference_id: '1-0', amount: { currency_code: 'USD', value: 10 } }],
      20,
    ]);

    render(<CartView />);

    await waitFor(() => {
      expect(mockCreateCartForPaypal).toHaveBeenCalledWith([item]);
      expect(mockLoadPaypal).toHaveBeenCalled();
      expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    });
  });
});
