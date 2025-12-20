import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Work, { metadata } from '../page';

jest.mock('@/components/MyWork/MyWork', () => ({
  __esModule: true,
  default: () => <div data-testid="my-work" />,
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

describe('work page', () => {
  it('renders work page and analytics', async () => {
    const element = await Work({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('my-work')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Work({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('exports metadata', () => {
    expect(metadata.title).toBe('My Work');
  });
});
