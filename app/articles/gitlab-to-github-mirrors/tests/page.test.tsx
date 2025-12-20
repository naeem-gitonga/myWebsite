import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article, { generateMetadata } from '../page';

jest.mock('@/components/Articles/GitlabToGithubMirrors/GitlabToGithubMirrors', () => ({
  __esModule: true,
  default: () => <div data-testid="gitlab-mirrors" />,
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

describe('gitlab-to-github-mirrors page', () => {
  it('renders article and analytics', async () => {
    const element = await Article({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('gitlab-mirrors')).toBeInTheDocument();
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
    expect(metadata.title).toBe('Gitlab to Github Mirrors (PUSH)');
  });
});
