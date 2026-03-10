import { renderHook, act, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAnalyticsDashboard } from '../useAnalyticsDashboard';
import * as analyticsApi from '@/utils/analyticsApi';

jest.mock('next/navigation');
jest.mock('@/utils/analyticsApi');

const mockData = [
  {
    timestamp: '2026-03-10T10:00:00Z',
    page: '/home',
    fromwebsite: 'google',
    sessionid: 'session1',
    device: 'mobile',
    eventtype: 'view',
    views: '100',
    unique_visitors: '50',
    unique_ips: '45',
  },
  {
    timestamp: '2026-03-10T11:00:00Z',
    page: '/blog',
    fromwebsite: 'direct',
    sessionid: 'session2',
    device: 'desktop',
    eventtype: 'click',
    views: '200',
    unique_visitors: '100',
    unique_ips: '95',
  },
];

describe('useAnalyticsDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (analyticsApi.fetchAnalyticsData as jest.Mock).mockResolvedValue(mockData);
  });

  it('should initialize with default filter values', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.year).toBe(new Date().getFullYear());
    });
  });

  it('should fetch data on mount', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(analyticsApi.fetchAnalyticsData).toHaveBeenCalled();
    });
  });

  it('should calculate stats from fetched data', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.stats.totalViews).toBe(300);
      expect(result.current.stats.totalUniqueVisitors).toBe(150);
      expect(result.current.stats.totalUniqueIps).toBe(140);
      expect(result.current.stats.uniqueSessions).toBe(2);
    });
  });

  it('should build chart data from fetched analytics', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.pageData.length).toBeGreaterThan(0);
      expect(result.current.deviceData.length).toBeGreaterThan(0);
      expect(result.current.sourceData.length).toBeGreaterThan(0);
      expect(result.current.sankeyData.nodes.length).toBeGreaterThan(0);
    });
  });

  it('should extract unique values for filters', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.uniquePages).toContain('/home');
      expect(result.current.uniquePages).toContain('/blog');
      expect(result.current.uniqueDevices).toContain('mobile');
      expect(result.current.uniqueDevices).toContain('desktop');
    });
  });

  it('should allow setting filter values', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.year).toBeDefined();
    });

    act(() => {
      result.current.setYear(2025);
      result.current.setMonth(6);
      result.current.setDay(15);
    });

    expect(result.current.year).toBe(2025);
    expect(result.current.month).toBe(6);
    expect(result.current.day).toBe(15);
  });

  it('should reset filters to defaults', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.year).toBeDefined();
    });

    const today = new Date();
    const expectedYear = today.getFullYear();
    const expectedMonth = today.getMonth() + 1;
    const expectedDay = today.getDate();

    act(() => {
      result.current.setYear(2020);
      result.current.setMonth(1);
      result.current.setDay(1);
      result.current.resetFilters();
    });

    expect(result.current.year).toBe(expectedYear);
    expect(result.current.month).toBe(expectedMonth);
    expect(result.current.day).toBe(expectedDay);
  });

  it('should handle unauthorized errors', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (analyticsApi.fetchAnalyticsData as jest.Mock).mockRejectedValueOnce(
      new Error('UNAUTHORIZED')
    );

    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should handle fetch errors', async () => {
    (analyticsApi.fetchAnalyticsData as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });
  });

  it('should auto-select first page when data loads', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.selectedPage).toBe('/home');
    });
  });

  it('should build line chart data for selected page', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.selectedPage).toBe('/home');
    });

    expect(result.current.lineData.length).toBeGreaterThan(0);
    expect(result.current.lineData[0]).toHaveProperty('timestamp');
    expect(result.current.lineData[0]).toHaveProperty('views');
  });

  it('should handle empty line data if no page selected', async () => {
    const { result } = renderHook(() => useAnalyticsDashboard());

    await waitFor(() => {
      expect(result.current.selectedPage).toBeDefined();
    });

    act(() => {
      result.current.setSelectedPage(null);
    });

    expect(result.current.lineData).toEqual([]);
  });
});
