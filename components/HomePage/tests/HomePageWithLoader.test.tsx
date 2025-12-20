import { render, screen } from '@testing-library/react';
import HomePageWithLoader, { hasSeenLoader } from '../HomePageWithLoader';

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

  it('renders home client immediately when loader has been seen', async () => {
    sessionStorage.setItem('homePageLoaderShown', 'true');
    const getSpy = jest.spyOn(Storage.prototype, 'getItem');
    render(<HomePageWithLoader />);
    expect(screen.getByTestId('home-client')).toBeInTheDocument();
    await screen.findByTestId('home-client');
    expect(getSpy.mock.calls.length).toBeGreaterThan(1);
    getSpy.mockRestore();
  });

  it('cleans up the loader timeout on unmount', () => {
    jest.useFakeTimers();
    sessionStorage.removeItem('homePageLoaderShown');
    const clearSpy = jest.spyOn(window, 'clearTimeout');
    const setSpy = jest.spyOn(window, 'setTimeout');
    const { unmount } = render(<HomePageWithLoader />);
    jest.runOnlyPendingTimers();
    expect(setSpy).toHaveBeenCalled();
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('returns false when window is undefined', () => {
    const originalWindow = window;
    Object.defineProperty(global, 'window', {
      value: undefined,
      configurable: true,
    });

    expect(hasSeenLoader()).toBe(false);

    Object.defineProperty(global, 'window', {
      value: originalWindow,
      configurable: true,
    });
  });
});
