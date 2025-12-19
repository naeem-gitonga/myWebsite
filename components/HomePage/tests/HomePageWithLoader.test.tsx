import { render, screen } from '@testing-library/react';
import HomePageWithLoader from '../HomePageWithLoader';

jest.mock('../HomePageClient', () => ({
  __esModule: true,
  default: () => <div data-testid="home-client" />,
}));

jest.mock('../../LoadingScreen/LoadingScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-screen" />,
}));

describe('HomePageWithLoader', () => {
  it('shows loading screen then home page client', () => {
    jest.useFakeTimers();
    sessionStorage.clear();

    const { rerender } = render(<HomePageWithLoader />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();

    jest.runOnlyPendingTimers();
    rerender(<HomePageWithLoader />);
    expect(screen.getByTestId('home-client')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
