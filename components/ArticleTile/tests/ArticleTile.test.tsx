import { render, screen } from '@testing-library/react';
import ArticleTile from '../ArticleTile';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className, target }: { children: React.ReactNode; href: string; className?: string; target?: string }) => (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  ),
}));

jest.mock('../../LazyImage/LazyImage', () => ({
  __esModule: true,
  default: ({ onLoadingComplete, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { onLoadingComplete?: () => void }) => {
    if (onLoadingComplete) {
      onLoadingComplete();
    }
    return <img data-testid="lazy-image" {...props} />;
  },
}));

describe('ArticleTile', () => {
  it('renders article tile with min read', () => {
    render(
      <ArticleTile
        article={{
          title: 'Hello',
          imageUrl: 'missing',
          lengthInMinutes: 3,
          publishedDate: 'Today',
          articleUrl: '/articles/hello',
        }}
        noTarget
      />
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });

  it('renders article tile for book type', () => {
    render(
      <ArticleTile
        article={{
          title: 'Book',
          imageUrl: 'img-a',
          lengthInMinutes: 0,
          publishedDate: 'Today',
          articleUrl: '/articles/book',
          isBook: true,
          type: 'ebook',
        }}
      />
    );
    expect(screen.getByText('ebook')).toBeInTheDocument();
  });
});
