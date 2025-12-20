import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays GTNG with the current year', () => {
    const currentYear = new Date().getFullYear().toString();
    render(<Footer />);
    expect(screen.getByText(`GTNG ${currentYear}`)).toBeInTheDocument();
  });

  it('has a wrapper div with id "footer"', () => {
    const { container } = render(<Footer />);
    const wrapper = container.querySelector('#footer');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies footerWrapper class to container', () => {
    const { container } = render(<Footer />);
    const wrapper = container.querySelector('#footer');
    expect(wrapper).toHaveClass('footerWrapper');
  });

  it('applies footer class to the footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });
});
