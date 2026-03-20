'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchTimelineData, type AnalyticsFilters, type TimelineRow } from '@/utils/analyticsApi';
import styles from './AdminDashboard.module.scss';

type Range = 'this-week' | 'this-month' | 'last-month' | 'this-year';

const RANGE_LABELS: Record<Range, string> = {
  'this-week': 'This Week',
  'this-month': 'This Month',
  'last-month': 'Last Month',
  'this-year': 'This Year',
};

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#fa709a', '#43e97b', '#f5a623', '#d0021b'];

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getRangeFilters(range: Range): AnalyticsFilters {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  switch (range) {
    case 'this-week': {
      const from = new Date(now);
      from.setDate(now.getDate() - 6);
      return { fromDate: toISODate(from), toDate: toISODate(now) };
    }
    case 'this-month':
      return { year, month };
    case 'last-month': {
      const lastMonth = month === 1 ? 12 : month - 1;
      const lastMonthYear = month === 1 ? year - 1 : year;
      return { year: lastMonthYear, month: lastMonth };
    }
    case 'this-year':
      return { year };
  }
}

type Props = {
  selectedPage: string | null;
};

export function ViewsTimelineChart({ selectedPage }: Props) {
  const [range, setRange] = useState<Range>('this-month');
  const [rows, setRows] = useState<TimelineRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchTimelineData(getRangeFilters(range))
      .then((data) => { if (!cancelled) setRows(data); })
      .catch(() => { if (!cancelled) setRows([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [range]);

  const filtered = selectedPage ? rows.filter((r) => r.page === selectedPage) : rows;

  const pages = Array.from(new Set(filtered.map((r) => r.page)));

  const pivoted = new Map<string, Record<string, number>>();
  filtered.forEach((r) => {
    if (!pivoted.has(r.timestamp)) pivoted.set(r.timestamp, {});
    pivoted.get(r.timestamp)![r.page] = parseInt(r.views) || 0;
  });

  const chartData = Array.from(pivoted.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([timestamp, values]) => ({ timestamp, ...values }));

  const title = selectedPage ? `Views Timeline — ${selectedPage}` : 'Views Timeline';

  return (
    <div className={styles.chartSection}>
      <div className={styles.chartHeader}>
        <h2>{title}</h2>
        <div className={styles.rangeToggle}>
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <button
              key={r}
              className={`${styles.rangeBtn} ${range === r ? styles.rangeBtnActive : ''}`}
              onClick={() => setRange(r)}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className={styles.chartLoading}>Loading...</p>
      ) : chartData.length === 0 ? (
        <p className={styles.noData}>No data for this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" fontSize={11} />
            <YAxis label={{ value: 'Views', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#666' } }} />
            <Tooltip />
            <Legend />
            {pages.map((page, idx) => (
              <Line
                key={page}
                type="monotone"
                dataKey={page}
                stroke={COLORS[idx % COLORS.length]}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
