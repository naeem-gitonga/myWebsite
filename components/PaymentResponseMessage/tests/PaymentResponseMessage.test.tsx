import { render, screen } from '@testing-library/react';
import PaymentResponseMessage from '../PaymentResponseMessage';
import ThanksView from '../ThanksView';

const mockUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('PaymentResponseMessage', () => {
  it('renders payment failure message', () => {
    render(<PaymentResponseMessage />);
    expect(
      screen.getByText(/unable to process your order/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/gtngbooks@gmail.com/i)).toBeInTheDocument();
  });

  it('renders success thank-you message', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams('referenceId=order-1')
    );
    render(<ThanksView />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('thank you!');
    expect(screen.getByText(/successfully processed/i)).toBeInTheDocument();
    expect(screen.getByText('order-1')).toBeInTheDocument();
  });

  it('renders failure-to-send email message', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams('referenceId=order-2&ftse=1')
    );
    render(<ThanksView />);
    expect(
      screen.getByText(/unsuccessful at sending/i)
    ).toBeInTheDocument();
    expect(screen.getByText('order-2')).toBeInTheDocument();
  });
});
