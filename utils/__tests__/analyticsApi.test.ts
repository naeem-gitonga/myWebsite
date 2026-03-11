import { fetchAnalyticsData, type AnalyticsFilters } from '../analyticsApi';

global.fetch = jest.fn();

describe('analyticsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAnalyticsData', () => {
    it('should fetch data with all filters', async () => {
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
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const filters: AnalyticsFilters = {
        year: 2026,
        month: 3,
        day: 10,
        page: ['/home'],
        device: ['mobile'],
        eventtype: ['view'],
        fromwebsite: ['google'],
      };

      const result = await fetchAnalyticsData(filters);

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/admin/analytics?')
      );

      const callUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(callUrl).toContain('year=2026');
      expect(callUrl).toContain('month=3');
      expect(callUrl).toContain('day=10');
      expect(callUrl).toContain('page=%2Fhome');
      expect(callUrl).toContain('device=mobile');
      expect(callUrl).toContain('eventtype=view');
      expect(callUrl).toContain('fromwebsite=google');
    });

    it('should fetch data with minimal filters', async () => {
      const mockData: unknown[] = [];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const filters: AnalyticsFilters = {
        year: 2026,
      };

      await fetchAnalyticsData(filters);

      const callUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(callUrl).toContain('year=2026');
      expect(callUrl).not.toContain('month');
    });

    it('should handle multiple values for array filters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const filters: AnalyticsFilters = {
        year: 2026,
        page: ['/home', '/blog', '/about'],
      };

      await fetchAnalyticsData(filters);

      const callUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      const pageParams = (callUrl.match(/page=/g) || []).length;
      expect(pageParams).toBe(3);
    });

    it('should throw error on 401 response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const filters: AnalyticsFilters = { year: 2026 };

      await expect(fetchAnalyticsData(filters)).rejects.toThrow('UNAUTHORIZED');
    });

    it('should throw error on failed response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const filters: AnalyticsFilters = { year: 2026 };

      await expect(fetchAnalyticsData(filters)).rejects.toThrow('Failed to fetch');
    });

    it('should return parsed JSON on success', async () => {
      const mockData = [{ page: '/home', views: '100' }];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchAnalyticsData({ year: 2026 });

      expect(result).toBe(mockData);
    });
  });
});
