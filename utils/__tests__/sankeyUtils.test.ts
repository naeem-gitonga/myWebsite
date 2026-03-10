import { buildSankeyData, type AnalyticsRow } from '../chartDataTransformers';

describe('sankeyUtils', () => {
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

  describe('buildSankeyData', () => {
    it('should create nodes for sources, pages, and events', () => {
      const result = buildSankeyData(mockData);

      expect(result.nodes.length).toBeGreaterThan(0);

      const sourceNodes = result.nodes.filter((n) => n.name.startsWith('Source:'));
      const pageNodes = result.nodes.filter((n) => n.name.startsWith('Page:'));
      const eventNodes = result.nodes.filter((n) => n.name.startsWith('Event:'));

      expect(sourceNodes.length).toBe(2); // google, direct
      expect(pageNodes.length).toBe(2); // /home, /blog
      expect(eventNodes.length).toBe(2); // view, click
    });

    it('should create links between source and page nodes', () => {
      const result = buildSankeyData(mockData);

      const sourcePageLinks = result.links.filter((link) => {
        const sourceName = result.nodes[link.source].name;
        const targetName = result.nodes[link.target].name;
        return sourceName.startsWith('Source:') && targetName.startsWith('Page:');
      });

      expect(sourcePageLinks.length).toBeGreaterThan(0);
    });

    it('should create links between page and event nodes', () => {
      const result = buildSankeyData(mockData);

      const pageEventLinks = result.links.filter((link) => {
        const sourceName = result.nodes[link.source].name;
        const targetName = result.nodes[link.target].name;
        return sourceName.startsWith('Page:') && targetName.startsWith('Event:');
      });

      expect(pageEventLinks.length).toBeGreaterThan(0);
    });

    it('should count flows correctly', () => {
      const result = buildSankeyData(mockData);

      // google -> /home should have value 2 (two sessions from google to /home)
      const googleHomeLink = result.links.find((link) => {
        const sourceName = result.nodes[link.source].name;
        const targetName = result.nodes[link.target].name;
        return sourceName === 'Source: google' && targetName === 'Page: /home';
      });

      expect(googleHomeLink?.value).toBe(2);
    });

    it('should handle empty data', () => {
      const result = buildSankeyData([]);

      expect(result.nodes).toEqual([]);
      expect(result.links).toEqual([]);
    });

    it('should return correct structure', () => {
      const result = buildSankeyData(mockData);

      expect(result).toHaveProperty('nodes');
      expect(result).toHaveProperty('links');
      expect(Array.isArray(result.nodes)).toBe(true);
      expect(Array.isArray(result.links)).toBe(true);
    });

    it('should have valid link indices', () => {
      const result = buildSankeyData(mockData);

      result.links.forEach((link) => {
        expect(link.source).toBeLessThan(result.nodes.length);
        expect(link.target).toBeLessThan(result.nodes.length);
        expect(link.source).toBeGreaterThanOrEqual(0);
        expect(link.target).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
