import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import StartMenu from '../StartMenu';

const mockUseEnvConfig = jest.fn();

jest.mock('@/hooks/useEnvConfig', () => ({
  __esModule: true,
  default: () => mockUseEnvConfig(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('StartMenu', () => {
  beforeEach(() => {
    mockUseEnvConfig.mockReturnValue({ SHOW_SHOP: 'true' });
  });

  it('renders all primary links', () => {
    render(<StartMenu onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'aboutMe' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'myWork' })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: 'myArticles' })).toHaveAttribute(
      'href',
      '/articles'
    );
    expect(screen.getByRole('link', { name: 'cart' })).toHaveAttribute(
      'href',
      '/cart'
    );
    expect(screen.getByRole('link', { name: 'contact' })).toHaveAttribute(
      'href',
      '/contact'
    );
    expect(screen.getByRole('link', { name: 'send me bitcoin' })).toHaveAttribute(
      'href',
      '/donate'
    );
  });

  it('toggles shop link based on env config', () => {
    mockUseEnvConfig.mockReturnValue({ SHOW_SHOP: 'false' });
    const { rerender } = render(<StartMenu onClose={jest.fn()} />);
    expect(screen.queryByRole('link', { name: 'shop' })).not.toBeInTheDocument();

    mockUseEnvConfig.mockReturnValue({ SHOW_SHOP: 'true' });
    rerender(<StartMenu onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'shop' })).toHaveAttribute(
      'href',
      '/shop'
    );
  });

  it('calls onClose when a link is clicked', () => {
    const onClose = jest.fn();
    render(<StartMenu onClose={onClose} />);
    fireEvent.click(screen.getByRole('link', { name: 'aboutMe' }));
    expect(onClose).toHaveBeenCalled();
  });
});
