'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';

type ChartData = {
  [key: string]: string | number;
};

type Props = {
  data: ChartData[];
};

export function TrafficBySourceChart({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className={styles.chartSection}>
      <h2>Traffic by Source</h2>
      <ResponsiveContainer width="100%" height={Math.max(250, data.length * 40)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="name" type="category" width={110} fontSize={12} />
          <Tooltip />
          <Bar dataKey="views" fill="#667eea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
