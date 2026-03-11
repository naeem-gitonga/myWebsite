import { calculateStats } from '../statsCalculators';
import type { AnalyticsRow } from '../chartDataTransformers';

describe('statsCalculators', () => {
  const mockData: AnalyticsRow[] = [
    {
      timestamp: '2026-03-10T10:00:00Z',
      page: '/home',
      userid: 'user1',
      ip: '1.1.1.1',
      fromwebsite: 'google',
      sessionid: 'session1',
      device: 'mobile',
      eventtype: 'view',
      views: '1',
      unique_visitors: '1',
      unique_ips: '1',
    },
    {
      timestamp: '2026-03-10T11:00:00Z',
      page: '/blog',
      userid: 'user2',
      ip: '2.2.2.2',
      fromwebsite: 'direct',
      sessionid: 'session2',
      device: 'desktop',
      eventtype: 'click',
      views: '1',
      unique_visitors: '1',
      unique_ips: '1',
    },
    {
      timestamp: '2026-03-10T12:00:00Z',
      page: '/home',
      userid: 'user1',
      ip: '1.1.1.1',
      fromwebsite: 'google',
      sessionid: 'session1',
      device: 'desktop',
      eventtype: 'view',
      views: '1',
      unique_visitors: '1',
      unique_ips: '1',
    },
  ];

  describe('calculateStats', () => {
    it('should calculate total views as row count', () => {
      const result = calculateStats(mockData);

      expect(result.totalViews).toBe(3);
    });

    it('should calculate total unique visitors by unique userid', () => {
      const result = calculateStats(mockData);

      expect(result.totalUniqueVisitors).toBe(2); // user1, user2
    });

    it('should calculate total unique IPs', () => {
      const result = calculateStats(mockData);

      expect(result.totalUniqueIps).toBe(2); // 1.1.1.1, 2.2.2.2
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

    it('should not count empty userid or ip as unique', () => {
      const dataWithMissing: AnalyticsRow[] = [
        { ...mockData[0], userid: '', ip: '' },
      ];

      const result = calculateStats(dataWithMissing);

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
