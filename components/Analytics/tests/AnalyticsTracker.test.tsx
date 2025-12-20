import { render } from '@testing-library/react';
import AnalyticsTracker, { getStagingTag } from '../AnalyticsTracker';

// Mock the analytics utility
const mockInitializeAnalytics = jest.fn(() => jest.fn());
jest.mock('@/utils/analytics', () => ({
  initializeAnalytics: (props: { fromWebsite: string; itemId?: string }) =>
    mockInitializeAnalytics(props),
}));

describe('AnalyticsTracker', () => {
  beforeEach(() => {
    mockInitializeAnalytics.mockClear();
    // Mock window.location for staging detection
    Object.defineProperty(window, 'location', {
      value: { hostname: 'www.naeemgitonga.com' },
      writable: true,
    });
  });

  it('renders nothing (returns null)', () => {
    const { container } = render(<AnalyticsTracker fromWebsite="test" />);
    expect(container.firstChild).toBeNull();
  });

  it('calls initializeAnalytics with fromWebsite prop', () => {
    render(<AnalyticsTracker fromWebsite="linkedin" />);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ fromWebsite: 'linkedin' })
    );
  });

  it('calls initializeAnalytics with itemId when provided', () => {
    render(<AnalyticsTracker fromWebsite="direct" itemId="item-123" />);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 'item-123' })
    );
  });

  it('appends staging tag on localhost', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'localhost' },
      writable: true,
    });
    render(<AnalyticsTracker fromWebsite="test" />);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ fromWebsite: 'test|analytics-staging' })
    );
  });

  it('normalizes empty fromWebsite to "direct"', () => {
    render(<AnalyticsTracker fromWebsite="" />);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ fromWebsite: 'direct' })
    );
  });

  it('does not append staging tag on non-staging host', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'example.com' },
      writable: true,
    });
    render(<AnalyticsTracker fromWebsite="referral" />);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ fromWebsite: 'referral' })
    );
  });

  it('handles window undefined in staging check', () => {
    const originalWindow = (global as any).window;
    Object.defineProperty(global, 'window', {
      value: undefined,
      configurable: true,
    });

    expect(getStagingTag()).toBeUndefined();

    Object.defineProperty(global, 'window', {
      value: originalWindow,
      configurable: true,
    });
  });
});
