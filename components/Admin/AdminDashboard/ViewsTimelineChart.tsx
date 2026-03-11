'use client';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';

type ChartData = {
  [key: string]: string | number;
};

type Props = {
  data: ChartData[];
  selectedPage: string | null;
};

export function ViewsTimelineChart({ data, selectedPage }: Props) {
  if (!selectedPage || data.length === 0) {
    return null;
  }

  return (
    <div className={styles.chartSection}>
      <h2>Views Timeline for {selectedPage}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="views" stroke="#667eea" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
