import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InterstitialPage, { generateMetadata } from '../page';

jest.mock('@/components/LoadingDots/LoadingDots', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-dots" />,
}));

jest.mock('@/components/Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: ({ fromWebsite }: { fromWebsite: string }) => (
    <div data-testid="analytics">{fromWebsite}</div>
  ),
}));

jest.mock('../Redirector', () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => <div data-testid="redirector">{url}</div>,
}));

describe('interstitial page', () => {
  it('renders with safe url', async () => {
    const element = await InterstitialPage({
      searchParams: Promise.resolve({ url: 'https://example.com', where: 'Example', fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('redirector')).toHaveTextContent('https://example.com');
    expect(screen.getByText('Now taking you to Example...')).toBeInTheDocument();
  });

  it('handles invalid url and default site name', async () => {
    const element = await InterstitialPage({
      searchParams: Promise.resolve({ url: 'javascript:alert(1)' }),
    } as any);
    render(element);
    expect(screen.getByTestId('redirector')).toHaveTextContent('');
    expect(screen.getByText('Now taking you to the destination...')).toBeInTheDocument();
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Interstitial page');
  });
});
