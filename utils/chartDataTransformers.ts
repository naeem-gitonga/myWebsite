/**
 * Utilities to transform raw analytics data into chart-ready formats
 */

export type AnalyticsRow = {
  timestamp: string;
  page: string;
  fromwebsite: string;
  sessionid: string;
  userid: string;
  device: string;
  eventtype: string;
  views: string;
  unique_visitors: string;
  unique_ips: string;
};

export type ChartData = {
  [key: string]: string | number;
};

/**
 * Generic grouping function for aggregating analytics data
 */
function groupAndAggregate(
  data: AnalyticsRow[],
  groupKey: keyof AnalyticsRow,
  aggregateFields: (keyof AnalyticsRow)[] = ['views', 'unique_visitors', 'unique_ips']
): ChartData[] {
  const map = new Map<string, ChartData>();

  data.forEach((row) => {
    const key = row[groupKey] || 'unknown';
    if (!map.has(key as string)) {
      map.set(key as string, { [groupKey]: key });
    }
    const entry = map.get(key as string)!;

    aggregateFields.forEach((field) => {
      const value = parseInt(row[field] || '0');
      entry[field] = ((entry[field] as number) || 0) + value;
    });
  });

  const result: ChartData[] = Array.from(map.values());
  // Sort by views descending
  result.sort((a, b) => ((b.views as number) || 0) - ((a.views as number) || 0));
  return result;
}

/**
 * Build data for "Views by Page" chart
 */
export function buildPageData(data: AnalyticsRow[]): ChartData[] {
  return groupAndAggregate(data, 'page');
}

/**
 * Build data for "Traffic by Device" pie chart
 */
export function buildDeviceData(data: AnalyticsRow[]): ChartData[] {
  const deviceMap = new Map<string, number>();

  data.forEach((row) => {
    const device = formatDevice(row.device || 'unknown');
    deviceMap.set(device, (deviceMap.get(device) || 0) + parseInt(row.views || '0'));
  });

  return Array.from(deviceMap, ([name, value]) => ({ name, value }));
}

/**
 * Build data for "Traffic by Source" chart
 */
export function buildSourceData(data: AnalyticsRow[]): ChartData[] {
  const sourceMap = new Map<string, number>();

  data.forEach((row) => {
    const source = row.fromwebsite || 'unknown';
    sourceMap.set(source, (sourceMap.get(source) || 0) + parseInt(row.views || '0'));
  });

  const result = Array.from(sourceMap, ([name, views]) => ({ name, views }));
  result.sort((a, b) => ((b.views as number) || 0) - ((a.views as number) || 0));
  return result;
}

/**
 * Build data for "Views Timeline" line chart (filtered by selected page)
 */
export function buildLineData(data: AnalyticsRow[], selectedPage: string | null): ChartData[] {
  if (!selectedPage) {
    return [];
  }

  return data
    .filter((r) => r.page === selectedPage)
    .map((r) => ({
      timestamp: r.timestamp,
      views: parseInt(r.views || '0'),
    }));
}

/**
 * Get unique values from a field across all rows
 */
export function getUniqueValues(data: AnalyticsRow[], field: keyof AnalyticsRow): string[] {
  return Array.from(new Set(data.map((r) => r[field])));
}

/**
 * Format device STRUCT as "browser | device"
 * Input: {device_type=mobile, browser=Chrome}
 * Output: Chrome | mobile
 */
export function formatDevice(deviceStr: string): string {
  if (!deviceStr) return 'unknown';

  // Try to parse STRUCT format: {device_type=mobile, browser=Chrome}
  const deviceTypeMatch = deviceStr.match(/device_type=(\w+)/);
  const browserMatch = deviceStr.match(/browser=([^,}]+)/);

  const deviceType = deviceTypeMatch ? deviceTypeMatch[1] : 'unknown';
  const browser = browserMatch ? browserMatch[1].trim() : 'unknown';

  return `${browser} | ${deviceType}`;
}
