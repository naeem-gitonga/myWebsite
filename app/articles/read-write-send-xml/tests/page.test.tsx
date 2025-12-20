import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article, { generateMetadata } from '../page';

jest.mock('@/components/Articles/ReadWriteSendXml/ReadWriteSendXml', () => ({
  __esModule: true,
  default: () => <div data-testid="read-write-send-xml" />,
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

describe('read-write-send-xml page', () => {
  it('renders article and analytics', async () => {
    const element = await Article({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('read-write-send-xml')).toBeInTheDocument();
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
    expect(metadata.title).toBe('XML, read, send, write: JavaScript client to Express/Node.js server');
  });
});
