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
      sessionid: 'session3',
      device: 'desktop',
      eventtype: 'view',
      views: '150',
      unique_visitors: '75',
      unique_ips: '70',
    },
  ];

  describe('buildPageData', () => {
    it('should group data by page and aggregate metrics', () => {
      const result = buildPageData(mockData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        page: '/home',
        views: 250,
        unique_visitors: 125,
        unique_ips: 115,
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
      expect(result.some((d) => d.name === 'mobile' && d.value === 100)).toBe(true);
      expect(result.some((d) => d.name === 'desktop' && d.value === 350)).toBe(true);
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
      expect(result.some((s) => s.name === 'google' && s.views === 250)).toBe(true);
      expect(result.some((s) => s.name === 'direct' && s.views === 200)).toBe(true);
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
        views: 100,
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
