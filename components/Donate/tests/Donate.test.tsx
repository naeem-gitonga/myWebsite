import { render, screen } from '@testing-library/react';
import Donate from '../Donate';

describe('Donate', () => {
  it('renders bitcoin donation section', () => {
    render(<Donate />);
    expect(screen.getByText('Donate Me Bitcoin')).toBeInTheDocument();
    expect(screen.getByAltText('QR code for my Bitcoin wallet')).toBeInTheDocument();
    expect(
      screen.getByText('1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7')
    ).toBeInTheDocument();
  });
});
