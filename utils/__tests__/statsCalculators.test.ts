import { calculateStats, type AnalyticsRow } from '../chartDataTransformers';

describe('statsCalculators', () => {
  const mockData: AnalyticsRow[] = [
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
    {
      timestamp: '2026-03-10T12:00:00Z',
      page: '/home',
      fromwebsite: 'google',
      sessionid: 'session1',
      device: 'desktop',
      eventtype: 'view',
      views: '150',
      unique_visitors: '75',
      unique_ips: '70',
    },
  ];

  describe('calculateStats', () => {
    it('should calculate total views correctly', () => {
      const result = calculateStats(mockData);

      expect(result.totalViews).toBe(450); // 100 + 200 + 150
    });

    it('should calculate total unique visitors correctly', () => {
      const result = calculateStats(mockData);

      expect(result.totalUniqueVisitors).toBe(225); // 50 + 100 + 75
    });

    it('should calculate total unique IPs correctly', () => {
      const result = calculateStats(mockData);

      expect(result.totalUniqueIps).toBe(210); // 45 + 95 + 70
    });

    it('should count unique sessions correctly', () => {
      const result = calculateStats(mockData);

      expect(result.uniqueSessions).toBe(2); // session1, session2
    });

    it('should handle empty data', () => {
      const result = calculateStats([]);

      expect(result.totalViews).toBe(0);
      expect(result.totalUniqueVisitors).toBe(0);
      expect(result.totalUniqueIps).toBe(0);
      expect(result.uniqueSessions).toBe(0);
    });

    it('should handle missing metric values', () => {
      const dataWithMissing: AnalyticsRow[] = [
        { ...mockData[0], views: '', unique_visitors: '', unique_ips: '' },
      ];

      const result = calculateStats(dataWithMissing);

      expect(result.totalViews).toBe(0);
      expect(result.totalUniqueVisitors).toBe(0);
      expect(result.totalUniqueIps).toBe(0);
    });

    it('should return correct structure', () => {
      const result = calculateStats(mockData);

      expect(result).toHaveProperty('totalViews');
      expect(result).toHaveProperty('totalUniqueVisitors');
      expect(result).toHaveProperty('totalUniqueIps');
      expect(result).toHaveProperty('uniqueSessions');
    });
  });
});
