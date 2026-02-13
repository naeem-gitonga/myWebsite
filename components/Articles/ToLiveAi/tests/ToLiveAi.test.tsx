import { render, screen } from '@testing-library/react';
import ToLiveAi from '../ToLiveAi';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('@/components/ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

describe('ToLiveAi', () => {
  it('renders the article heading and subheading', () => {
    render(<ToLiveAi />);

    expect(screen.getByText('ToLive AI')).toBeInTheDocument();
    expect(screen.getByText('Your Personal AI That Knows You')).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    render(<ToLiveAi />);
    const heroImage = screen.getByAltText('ToLive AI hero image');

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      'src',
      '/images/tolive-ai-hero.webp'
    );
  });

  it('renders the CTA link', () => {
    render(<ToLiveAi />);
    const link = screen.getByRole('link', { name: 'Click here' });

    expect(link).toHaveAttribute('href', 'https://tolive.ai');
  });
});
