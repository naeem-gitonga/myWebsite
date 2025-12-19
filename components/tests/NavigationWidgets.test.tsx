import { fireEvent, render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader/PageHeader';
import ReturnArrow from '../ReturnArrow/ReturnArrow';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock('../ShoppingCartIcon/ShoppingCartIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-icon" />,
}));

describe('navigation widgets', () => {
  it('renders page header links when not hidden', () => {
    render(<PageHeader headerName="home" hideLinks={false} />);
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('hides links when requested', () => {
    render(<PageHeader headerName="home" hideLinks />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('scrolls to top when return arrow is clicked', () => {
    jest.useFakeTimers();
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'pageYOffset', { value: 6, writable: true });

    const { container } = render(<ReturnArrow />);
    const arrow = container.querySelector('#arrow');
    fireEvent.click(arrow as HTMLElement);
    jest.runOnlyPendingTimers();

    expect(window.scrollTo).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
