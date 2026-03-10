/**
 * Calculate aggregate statistics from analytics data
 */

import type { AnalyticsRow } from './chartDataTransformers';

export type Stats = {
  totalViews: number;
  totalUniqueVisitors: number;
  totalUniqueIps: number;
  uniqueSessions: number;
};

/**
 * Calculate statistics from raw analytics data
 */
export function calculateStats(data: AnalyticsRow[]): Stats {
  const totalViews = data.reduce((sum, r) => sum + parseInt(r.views || '0'), 0);
  const totalUniqueVisitors = data.reduce((sum, r) => sum + parseInt(r.unique_visitors || '0'), 0);
  const totalUniqueIps = data.reduce((sum, r) => sum + parseInt(r.unique_ips || '0'), 0);
  const uniqueSessions = new Set(data.map((r) => r.sessionid)).size;

  return {
    totalViews,
    totalUniqueVisitors,
    totalUniqueIps,
    uniqueSessions,
  };
}
