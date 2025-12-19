import { render, screen } from '@testing-library/react';
import ShopView from '../ShopView';

const mockUseCart = jest.fn();
const mockUseModal = jest.fn();

jest.mock('../../../hooks/useCart', () => ({
  __esModule: true,
  default: () => mockUseCart(),
}));

jest.mock('../../../hooks/useModal', () => ({
  __esModule: true,
  default: () => mockUseModal(),
}));

jest.mock('../../ItemTile/ItemTile', () => ({
  __esModule: true,
  default: ({ product }: { product: { title: string } }) => (
    <div>{product.title}</div>
  ),
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('../../ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('../../../utils/products', () => ({
  products: [
    { id: 1, title: 'Shown', show: 'true' },
    { id: 2, title: 'Hidden', show: 'false' },
  ],
}));

describe('ShopView', () => {
  beforeEach(() => {
    mockUseCart.mockReturnValue([jest.fn(), [], jest.fn(), jest.fn()]);
    mockUseModal.mockReturnValue([false, jest.fn()]);
  });

  it('renders only visible products', () => {
    render(<ShopView />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('shop');
    expect(screen.getByText('Shown')).toBeInTheDocument();
    expect(screen.queryByText('Hidden')).toBeNull();
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });
});
