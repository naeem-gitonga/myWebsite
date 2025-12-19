import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock('../../ShoppingCartIcon/ShoppingCartIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-icon" />,
}));

describe('PageHeader', () => {
  it('renders links when not hidden', () => {
    render(<PageHeader headerName="home" hideLinks={false} />);
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('hides links when requested', () => {
    render(<PageHeader headerName="home" hideLinks />);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
