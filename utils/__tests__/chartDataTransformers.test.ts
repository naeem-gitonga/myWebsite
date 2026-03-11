import {
  buildPageData,
  buildDeviceData,
  buildSourceData,
  buildLineData,
  getUniqueValues,
  type AnalyticsRow,
} from '../chartDataTransformers';

describe('chartDataTransformers', () => {
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
      sessionid: 'session3',
      device: 'desktop',
      eventtype: 'view',
      views: '1',
      unique_visitors: '1',
      unique_ips: '1',
    },
  ];

  describe('buildPageData', () => {
    it('should group data by page and count unique visitors and IPs', () => {
      const result = buildPageData(mockData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        page: '/home',
        views: 2,
        unique_visitors: 1, // user1 appears twice
        unique_ips: 1,      // 1.1.1.1 appears twice
      });
    });

    it('should sort by views descending', () => {
      const result = buildPageData(mockData);

      expect(result[0].views).toBeGreaterThanOrEqual((result[1].views as number) || 0);
    });

    it('should handle empty data', () => {
      const result = buildPageData([]);

      expect(result).toEqual([]);
    });
  });

  describe('buildDeviceData', () => {
    it('should group data by device and sum views', () => {
      const result = buildDeviceData(mockData);

      expect(result).toHaveLength(2);
      expect(result.some((d) => d.name === 'mobile' && d.value === 1)).toBe(true);
      expect(result.some((d) => d.name === 'desktop' && d.value === 2)).toBe(true);
    });

    it('should handle missing device values', () => {
      const dataWithMissing: AnalyticsRow[] = [
        ...mockData,
        { ...mockData[0], device: '' },
      ];

      const result = buildDeviceData(dataWithMissing);

      expect(result.some((d) => d.name === 'unknown')).toBe(true);
    });
  });

  describe('buildSourceData', () => {
    it('should group data by source and sum views', () => {
      const result = buildSourceData(mockData);

      expect(result).toHaveLength(2);
      expect(result.some((s) => s.name === 'google' && s.views === 2)).toBe(true);
      expect(result.some((s) => s.name === 'direct' && s.views === 1)).toBe(true);
    });

    it('should sort by views descending', () => {
      const result = buildSourceData(mockData);

      if (result.length > 1) {
        expect((result[0].views as number) || 0).toBeGreaterThanOrEqual((result[1].views as number) || 0);
      }
    });
  });

  describe('buildLineData', () => {
    it('should filter data by selected page and map to timeline format', () => {
      const result = buildLineData(mockData, '/home');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        timestamp: '2026-03-10T10:00:00Z',
        views: 1,
      });
    });

    it('should return empty array if page not found', () => {
      const result = buildLineData(mockData, '/nonexistent');

      expect(result).toEqual([]);
    });

    it('should return empty array if no page selected', () => {
      const result = buildLineData(mockData, null);

      expect(result).toEqual([]);
    });
  });

  describe('getUniqueValues', () => {
    it('should get unique values from a field', () => {
      const result = getUniqueValues(mockData, 'page');

      expect(result).toHaveLength(2);
      expect(result).toContain('/home');
      expect(result).toContain('/blog');
    });

    it('should return empty array for empty data', () => {
      const result = getUniqueValues([], 'page');

      expect(result).toEqual([]);
    });

    it('should handle all field types', () => {
      const devices = getUniqueValues(mockData, 'device');
      const events = getUniqueValues(mockData, 'eventtype');

      expect(devices).toContain('mobile');
      expect(devices).toContain('desktop');
      expect(events).toContain('view');
      expect(events).toContain('click');
    });
  });
});
