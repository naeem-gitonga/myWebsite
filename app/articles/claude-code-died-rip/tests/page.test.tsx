import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article, { generateMetadata } from '../page';

jest.mock('@/components/Articles/ClaudeDiedRip/ClaudeDiedRip', () => ({
  __esModule: true,
  default: () => <div data-testid="claude-died-rip" />,
}));

jest.mock('@/components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/components/Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: ({ fromWebsite }: { fromWebsite: string }) => (
    <div data-testid="analytics">{fromWebsite}</div>
  ),
}));

describe('claude-died-rip page', () => {
  it('renders article and analytics', async () => {
    const element = await Article({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('claude-died-rip')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Article({
      searchParams: Promise.resolve({}),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata with title, description, and OG image', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Claude Died, RIP');
    expect(metadata.description).toBe(
      'I built a coding CLI tool with a local model. Then it beat the original.'
    );
    const images = (metadata.openGraph as any)?.images as any[];
    expect(images[0].url).toContain('claude-died-rip-og.webp');
  });
});
