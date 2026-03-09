import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article, { generateMetadata } from '../page';

jest.mock('@/components/Articles/AiRuinedMyApp/AiRuinedMyApp', () => ({
  __esModule: true,
  default: () => <div data-testid="ai-ruined-my-app" />,
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

describe('ai-ruined-my-app page', () => {
  it('renders article and analytics', async () => {
    const element = await Article({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('ai-ruined-my-app')).toBeInTheDocument();
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
    expect(metadata.title).toBe('AI Ruined My App');
    expect(metadata.description).toBe(
      'A cautionary tale about relying too heavily on AI for architectural decisions in application development.'
    );
  });

  it('generates openGraph metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.openGraph?.title).toBe('AI Ruined My App');
    expect(metadata.openGraph?.type).toBe('article');
  });
});
