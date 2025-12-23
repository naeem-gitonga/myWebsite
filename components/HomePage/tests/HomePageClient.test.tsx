import { render, screen } from '@testing-library/react';
import HomePageClient from '../HomePageClient';

const mockUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <script data-testid="next-script" {...props} />
  ),
}));

jest.mock('../../Header/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="header" />,
}));

jest.mock('../../AboutMe/AboutMe', () => ({
  __esModule: true,
  default: () => <div data-testid="about-me" />,
}));

jest.mock('../../Donate/Donate', () => ({
  __esModule: true,
  default: () => <div data-testid="donate" />,
}));

jest.mock('../../ArticleTileView/ArticleTileView', () => ({
  __esModule: true,
  default: () => <div data-testid="articles" />,
}));

jest.mock('../../Footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('../../ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('../../ShoppingCartIcon/ShoppingCartIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-icon" />,
}));

jest.mock('../../PromoBanner/PromoBanner', () => ({
  __esModule: true,
  default: () => <div data-testid="promo-banner" />,
}));

jest.mock('../../Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: () => <div data-testid="analytics-tracker" />,
}));

jest.mock('../../../hooks/useInfoLog', () => ({
  __esModule: true,
  default: () => {},
}));

describe('HomePageClient', () => {
  it('renders home page client with all components', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('fromWebsite=ref'));
    (window as any).particlesJS = jest.fn();

    render(<HomePageClient />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-tracker')).toBeInTheDocument();
    expect(screen.getByTestId('promo-banner')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });

  it('initializes particles.js when available', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(''));
    const mockParticlesJS = jest.fn();
    (window as any).particlesJS = mockParticlesJS;

    render(<HomePageClient />);
    expect(mockParticlesJS).toHaveBeenCalledWith('particles-js', expect.any(Object));
  });
});
