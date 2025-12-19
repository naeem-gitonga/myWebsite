import { render } from '@testing-library/react';
import AnalyticsTracker from '../AnalyticsTracker';

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
});
