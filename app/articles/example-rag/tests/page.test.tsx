import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article, { generateMetadata } from '../page';

jest.mock('@/components/Articles/ExampleRag/ExampleRag', () => ({
  __esModule: true,
  default: () => <div data-testid="example-rag" />,
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

describe('example-rag page', () => {
  it('renders article and analytics', async () => {
    const element = await Article({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('example-rag')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Article({
      searchParams: Promise.resolve({}),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toEqual(expect.any(String));
    expect((metadata.title as string).length).toBeGreaterThan(0);
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.twitter?.title).toBe(metadata.title);
  });
});
