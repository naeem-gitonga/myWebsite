/**
 * Custom hook for managing analytics dashboard state and data
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAnalyticsData, type AnalyticsFilters } from '@/utils/analyticsApi';
import { calculateStats, type Stats } from '@/utils/statsCalculators';
import {
  buildPageData,
  buildLineData,
  buildDeviceData,
  buildSourceData,
  getUniqueValues,
  type AnalyticsRow,
  type ChartData,
} from '@/utils/chartDataTransformers';
import { buildSankeyData, type SankeyData } from '@/utils/sankeyUtils';

export interface UseAnalyticsDashboardReturn {
  // Data
  data: AnalyticsRow[];
  stats: Stats;
  pageData: ChartData[];
  lineData: ChartData[];
  deviceData: ChartData[];
  sourceData: ChartData[];
  sankeyData: SankeyData;

  // Unique values for filters
  uniquePages: string[];
  uniqueDevices: string[];
  uniqueEvents: string[];
  uniqueWebsites: string[];
  uniqueUserIds: string[];

  // Filter state
  year: number;
  month: number;
  day: number;
  selectedPages: string[];
  selectedDevices: string[];
  selectedEvents: string[];
  selectedWebsites: string[];
  selectedUserIds: string[];
  selectedPage: string | null;

  // UI state
  loading: boolean;
  error: string;

  // Actions
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  setSelectedPages: (pages: string[]) => void;
  setSelectedDevices: (devices: string[]) => void;
  setSelectedEvents: (events: string[]) => void;
  setSelectedWebsites: (websites: string[]) => void;
  setSelectedUserIds: (userids: string[]) => void;
  setSelectedPage: (page: string | null) => void;
  fetchData: () => Promise<void>;
  resetFilters: () => void;
}

export function useAnalyticsDashboard(): UseAnalyticsDashboardReturn {
  const router = useRouter();

  // Filter state
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  // Data state
  const [data, setData] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const filters: AnalyticsFilters = {
        year,
        month,
        day,
        page: selectedPages,
        device: selectedDevices,
        eventtype: selectedEvents,
        fromwebsite: selectedWebsites,
        userid: selectedUserIds,
      };

      const rows = await fetchAnalyticsData(filters);
      setData(rows);

      // Auto-select first page if available
      const pages = getUniqueValues(rows, 'page');
      if (pages.length > 0 && !selectedPage) {
        setSelectedPage(pages[0]);
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        router.push('/admin/login');
        return;
      }
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [year, month, day, selectedPages, selectedDevices, selectedEvents, selectedWebsites, selectedUserIds, selectedPage, router]);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
    setDay(new Date().getDate());
    setSelectedPages([]);
    setSelectedDevices([]);
    setSelectedEvents([]);
    setSelectedWebsites([]);
    setSelectedUserIds([]);
  }, []);

  // Transform data
  const stats = calculateStats(data);
  const pageData = buildPageData(data);
  const lineData = buildLineData(data, selectedPage);
  const deviceData = buildDeviceData(data);
  const sourceData = buildSourceData(data);
  const sankeyData = buildSankeyData(data);

  const uniquePages = getUniqueValues(data, 'page');
  const uniqueDevices = getUniqueValues(data, 'device');
  const uniqueEvents = getUniqueValues(data, 'eventtype');
  const uniqueWebsites = getUniqueValues(data, 'fromwebsite');
  const uniqueUserIds = getUniqueValues(data, 'userid');

  return {
    // Data
    data,
    stats,
    pageData,
    lineData,
    deviceData,
    sourceData,
    sankeyData,

    // Unique values
    uniquePages,
    uniqueDevices,
    uniqueEvents,
    uniqueWebsites,
    uniqueUserIds,

    // Filter state
    year,
    month,
    day,
    selectedPages,
    selectedDevices,
    selectedEvents,
    selectedWebsites,
    selectedUserIds,
    selectedPage,

    // UI state
    loading,
    error,

    // Actions
    setYear,
    setMonth,
    setDay,
    setSelectedPages,
    setSelectedDevices,
    setSelectedEvents,
    setSelectedWebsites,
    setSelectedUserIds,
    setSelectedPage,
    fetchData,
    resetFilters,
  };
}
