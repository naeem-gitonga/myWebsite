'use client';

import { useRouter } from 'next/navigation';
import styles from './AdminDashboard.module.scss';
import { useAnalyticsDashboard } from '@/hooks/useAnalyticsDashboard';
import { StatCards } from './StatCards';
import { FilterSection } from './FilterSection';
import { ViewsByPageChart } from './ViewsByPageChart';
import { ViewsTimelineChart } from './ViewsTimelineChart';
import { TrafficByDeviceChart } from './TrafficByDeviceChart';
import { TrafficBySourceChart } from './TrafficBySourceChart';
import { UserJourneyChart } from './UserJourneyChart';
import { DataTable } from './DataTable';

export default function AdminDashboard(): React.JSX.Element {
  const router = useRouter();
  const dashboard = useAnalyticsDashboard();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleSort = (key: string) => {
    // Sort logic handled in DataTable component
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Analytics Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <FilterSection
        year={dashboard.year}
        month={dashboard.month}
        day={dashboard.day}
        selectedPages={dashboard.selectedPages}
        selectedDevices={dashboard.selectedDevices}
        selectedEvents={dashboard.selectedEvents}
        selectedWebsites={dashboard.selectedWebsites}
        selectedUserIds={dashboard.selectedUserIds}
        uniquePages={dashboard.uniquePages}
        uniqueDevices={dashboard.uniqueDevices}
        uniqueEvents={dashboard.uniqueEvents}
        uniqueWebsites={dashboard.uniqueWebsites}
        uniqueUserIds={dashboard.uniqueUserIds}
        loading={dashboard.loading}
        onYearChange={dashboard.setYear}
        onMonthChange={dashboard.setMonth}
        onDayChange={dashboard.setDay}
        onPagesChange={dashboard.setSelectedPages}
        onDevicesChange={dashboard.setSelectedDevices}
        onEventsChange={dashboard.setSelectedEvents}
        onWebsitesChange={dashboard.setSelectedWebsites}
        onUserIdsChange={dashboard.setSelectedUserIds}
        onApplyFilters={dashboard.fetchData}
        onResetFilters={dashboard.resetFilters}
      />

      {dashboard.error && <p className={styles.error}>{dashboard.error}</p>}

      {dashboard.data.length > 0 ? (
        <>
          <StatCards
            totalViews={dashboard.stats.totalViews}
            totalUniqueVisitors={dashboard.stats.totalUniqueVisitors}
            totalUniqueIps={dashboard.stats.totalUniqueIps}
            uniqueSessions={dashboard.stats.uniqueSessions}
          />

          <ViewsByPageChart data={dashboard.pageData} onPageSelect={dashboard.setSelectedPage} />

          <ViewsTimelineChart data={dashboard.lineData} selectedPage={dashboard.selectedPage} />

          <TrafficByDeviceChart data={dashboard.deviceData} />

          <TrafficBySourceChart data={dashboard.sourceData} />

          <UserJourneyChart data={dashboard.sankeyData} />

          <DataTable data={dashboard.data} sortKey="views" sortOrder="desc" onSort={handleSort} />
        </>
      ) : !dashboard.loading && !dashboard.error ? (
        <p className={styles.noData}>No data available</p>
      ) : null}
    </div>
  );
}
