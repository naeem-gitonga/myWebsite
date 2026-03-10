'use client';

import styles from './AdminDashboard.module.scss';

type Props = {
  totalViews: number;
  totalUniqueVisitors: number;
  totalUniqueIps: number;
  uniqueSessions: number;
};

export function StatCards({
  totalViews,
  totalUniqueVisitors,
  totalUniqueIps,
  uniqueSessions,
}: Props) {
  return (
    <div className={styles.statsSection}>
      <div className={styles.statCard}>
        <h3>Total Views</h3>
        <p className={styles.statValue}>{totalViews.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Unique Visitors</h3>
        <p className={styles.statValue}>{totalUniqueVisitors.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Unique IPs</h3>
        <p className={styles.statValue}>{totalUniqueIps.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Unique Sessions</h3>
        <p className={styles.statValue}>{uniqueSessions.toLocaleString()}</p>
      </div>
    </div>
  );
}
