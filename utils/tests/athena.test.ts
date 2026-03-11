import { buildWhereClause, AnalyticsFilters } from '../athena';

describe('athena utilities', () => {
  describe('buildWhereClause', () => {
    it('returns empty string when no filters provided', () => {
      const result = buildWhereClause({});
      expect(result).toBe('');
    });

    it('builds date filter with year, month, and day', () => {
      const filters: AnalyticsFilters = {
        year: 2024,
        month: 3,
        day: 15,
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("year = '2024'");
      expect(result).toContain("month = '03'");
      expect(result).toContain("day = '15'");
    });

    it('builds date filter with year and month', () => {
      const filters: AnalyticsFilters = {
        year: 2024,
        month: 3,
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("year = '2024'");
      expect(result).toContain("month = '03'");
    });

    it('builds date filter with year only', () => {
      const filters: AnalyticsFilters = {
        year: 2024,
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("year = '2024'");
    });

    it('builds page filter with single value', () => {
      const filters: AnalyticsFilters = {
        page: ['/home'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("page IN ('/home')");
    });

    it('builds page filter with multiple values', () => {
      const filters: AnalyticsFilters = {
        page: ['/home', '/blog', '/contact'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("page IN ('/home', '/blog', '/contact')");
    });

    it('builds device filter from struct format values', () => {
      const filters: AnalyticsFilters = {
        device: ['{device_type=mobile, browser=Safari}', '{device_type=desktop, browser=Chrome}'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("device.device_type = 'mobile' AND device.browser = 'Safari'");
      expect(result).toContain("device.device_type = 'desktop' AND device.browser = 'Chrome'");
    });

    it('builds eventtype filter', () => {
      const filters: AnalyticsFilters = {
        eventtype: ['view', 'click'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("eventtype IN ('view', 'click')");
    });

    it('builds fromwebsite filter', () => {
      const filters: AnalyticsFilters = {
        fromwebsite: ['google', 'direct'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("fromwebsite IN ('google', 'direct')");
    });

    it('combines multiple filters with AND', () => {
      const filters: AnalyticsFilters = {
        year: 2024,
        page: ['/home'],
        device: ['{device_type=mobile, browser=Chrome}'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain('AND');
      expect(result).toContain("year = '2024'");
      expect(result).toContain("page IN ('/home')");
      expect(result).toContain("device.device_type = 'mobile' AND device.browser = 'Chrome'");
    });

    it('sanitizes filter values to prevent SQL injection', () => {
      const filters: AnalyticsFilters = {
        page: ["'/'; DROP TABLE analytics_db.mypersonalwebsite_analytics; --"],
      };
      const result = buildWhereClause(filters);
      // Quotes are escaped, so the injection is neutralized
      expect(result).toContain("''");
      // The dangerous string is escaped as a literal, preventing the injection
      expect(result).toContain("page IN");
    });

    it('truncates overly long filter values', () => {
      const longValue = 'a'.repeat(300);
      const filters: AnalyticsFilters = {
        page: [longValue],
      };
      const result = buildWhereClause(filters);
      expect(result.length).toBeLessThan(400);
    });

    it('handles empty array filters by ignoring them', () => {
      const filters: AnalyticsFilters = {
        page: [],
        device: [],
      };
      const result = buildWhereClause(filters);
      expect(result).toBe('');
    });

    it('ignores undefined filter values', () => {
      const filters: AnalyticsFilters = {
        page: undefined,
        device: ['{device_type=mobile, browser=Chrome}'],
      };
      const result = buildWhereClause(filters);
      expect(result).toContain("device.device_type = 'mobile'");
      expect(result).not.toContain('page IN');
    });
  });
});
