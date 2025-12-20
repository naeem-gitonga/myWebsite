import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import About, { generateMetadata } from '../page';

jest.mock('@/components/AboutMe/AboutMe', () => ({
  __esModule: true,
  default: () => <div data-testid="about-me" />,
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

describe('about page', () => {
  it('renders analytics and about content', async () => {
    const element = await About({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('about-me')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await About({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('About Naeem Gitonga');
  });
});
