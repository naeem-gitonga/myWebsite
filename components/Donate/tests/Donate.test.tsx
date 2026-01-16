import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Donate from '../Donate';

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('Donate', () => {
  it('renders the donate header and wallet address', () => {
    const { container } = render(<Donate />);

    expect(screen.getByTestId('page-header')).toHaveTextContent('donate');
    expect(
      screen.getByText('1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-address="1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7"]')
    ).toBeInTheDocument();
  });

  it('renders the QR code image', () => {
    render(<Donate />);
    const img = screen.getByAltText('QR code for my Bitcoin wallet');
    expect(img).toHaveAttribute('src', '/images/sharable-wallet-addr.webp');
  });
});
