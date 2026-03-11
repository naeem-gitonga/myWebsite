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
  // For raw events, each row is one view
  const totalViews = data.length;
  const uniqueUserIds = new Set(data.map((r) => r.userid).filter(Boolean)).size;
  const uniqueSessions = new Set(data.map((r) => r.sessionid)).size;
  const uniqueIPs = new Set(data.map((r) => r.ip).filter(Boolean)).size;

  return {
    totalViews,
    totalUniqueVisitors: uniqueUserIds,
    totalUniqueIps: uniqueIPs,
    uniqueSessions,
  };
}
