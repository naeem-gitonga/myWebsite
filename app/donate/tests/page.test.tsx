import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DonatePage from '../page';

jest.mock('@/components/Donate/Donate', () => ({
  __esModule: true,
  default: () => <div data-testid="donate" />,
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

describe('donate page', () => {
  it('renders donate and analytics', async () => {
    const element = await DonatePage({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('ref');
    expect(screen.getByTestId('donate')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await DonatePage({
      searchParams: Promise.resolve({}),
    } as any);
    render(element);
    expect(screen.getByTestId('analytics')).toHaveTextContent('direct');
  });
});
