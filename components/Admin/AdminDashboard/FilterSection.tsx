'use client';

import styles from './AdminDashboard.module.scss';

type Props = {
  year: number;
  month: number;
  day: number;
  selectedPages: string[];
  selectedDevices: string[];
  selectedEvents: string[];
  selectedWebsites: string[];
  selectedUserIds: string[];
  uniquePages: string[];
  uniqueDevices: string[];
  uniqueEvents: string[];
  uniqueWebsites: string[];
  uniqueUserIds: string[];
  loading: boolean;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDayChange: (day: number) => void;
  onPagesChange: (pages: string[]) => void;
  onDevicesChange: (devices: string[]) => void;
  onEventsChange: (events: string[]) => void;
  onWebsitesChange: (websites: string[]) => void;
  onUserIdsChange: (userids: string[]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
};

export function FilterSection({
  year,
  month,
  day,
  selectedPages,
  selectedDevices,
  selectedEvents,
  selectedWebsites,
  selectedUserIds,
  uniquePages,
  uniqueDevices,
  uniqueEvents,
  uniqueWebsites,
  uniqueUserIds,
  loading,
  onYearChange,
  onMonthChange,
  onDayChange,
  onPagesChange,
  onDevicesChange,
  onEventsChange,
  onWebsitesChange,
  onUserIdsChange,
  onApplyFilters,
  onResetFilters,
}: Props) {
  return (
    <div className={styles.filterSection}>
      <h2 className={styles.filterTitle}>Filters</h2>

      <div className={styles.filterGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="year-input">Year</label>
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            min="2020"
            max={new Date().getFullYear()}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="month-select">Month</label>
          <select id="month-select" value={month} onChange={(e) => onMonthChange(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
              <option key={m} value={m}>
                {new Date(2024, m - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="day-input">Day</label>
          <input
            id="day-input"
            type="number"
            value={day}
            onChange={(e) => onDayChange(parseInt(e.target.value))}
            min="1"
            max="31"
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="pages-select">Pages {selectedPages.length > 0 && `(${selectedPages.length})`}</label>
          <select
            id="pages-select"
            multiple
            value={selectedPages}
            onChange={(e) => onPagesChange(Array.from(e.target.selectedOptions, (op) => op.value))}
          >
            {uniquePages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="devices-select">Devices {selectedDevices.length > 0 && `(${selectedDevices.length})`}</label>
          <select
            id="devices-select"
            multiple
            value={selectedDevices}
            onChange={(e) => onDevicesChange(Array.from(e.target.selectedOptions, (op) => op.value))}
          >
            {uniqueDevices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="events-select">Event Types {selectedEvents.length > 0 && `(${selectedEvents.length})`}</label>
          <select
            id="events-select"
            multiple
            value={selectedEvents}
            onChange={(e) => onEventsChange(Array.from(e.target.selectedOptions, (op) => op.value))}
          >
            {uniqueEvents.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="websites-select">Traffic Source {selectedWebsites.length > 0 && `(${selectedWebsites.length})`}</label>
          <select
            id="websites-select"
            multiple
            value={selectedWebsites}
            onChange={(e) => onWebsitesChange(Array.from(e.target.selectedOptions, (op) => op.value))}
          >
            {uniqueWebsites.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="users-select">User IDs {selectedUserIds.length > 0 && `(${selectedUserIds.length})`}</label>
          <select
            id="users-select"
            multiple
            value={selectedUserIds}
            onChange={(e) => onUserIdsChange(Array.from(e.target.selectedOptions, (op) => op.value))}
          >
            {uniqueUserIds.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button onClick={onApplyFilters} disabled={loading} className={styles.applyBtn}>
          {loading ? 'Loading...' : 'Apply Filters'}
        </button>
        <button onClick={onResetFilters} className={styles.resetBtn}>
          Reset
        </button>
      </div>
    </div>
  );
}
