import { render, screen } from '@testing-library/react';
import PromoBanner from '../PromoBanner';

describe('PromoBanner', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders promo banner when enabled', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SHOW_PROMO_BANNER: 'true',
      NEXT_PUBLIC_PROMO_BANNER_TEXT: 'Promo',
    };
    render(<PromoBanner />);
    expect(screen.getByText('Promo')).toBeInTheDocument();
  });
});
