/**
 * Analytics API communication
 */

import type { AnalyticsRow } from './chartDataTransformers';

export interface AnalyticsFilters {
  year?: number;
  month?: number;
  day?: number;
  page?: string[];
  device?: string[];
  eventtype?: string[];
  fromwebsite?: string[];
  userid?: string[];
}

/**
 * Build query parameters from filter object
 */
function buildQueryParams(filters: AnalyticsFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.year) params.append('year', filters.year.toString());
  if (filters.month) params.append('month', filters.month.toString());
  if (filters.day) params.append('day', filters.day.toString());

  filters.page?.forEach((p) => params.append('page', p));
  filters.device?.forEach((d) => params.append('device', d));
  filters.eventtype?.forEach((e) => params.append('eventtype', e));
  filters.fromwebsite?.forEach((w) => params.append('fromwebsite', w));
  filters.userid?.forEach((u) => params.append('userid', u));

  return params;
}

/**
 * Fetch analytics data from API
 */
export async function fetchAnalyticsData(filters: AnalyticsFilters): Promise<AnalyticsRow[]> {
  const params = buildQueryParams(filters);
  const response = await fetch(`/api/admin/analytics?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}
