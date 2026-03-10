'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';

type ChartData = {
  [key: string]: string | number;
};

type Props = {
  data: ChartData[];
  onPageSelect: (page: string) => void;
};

export function ViewsByPageChart({ data, onPageSelect }: Props) {
  return (
    <div className={styles.chartSection}>
      <h2>Views by Page</h2>
      <ResponsiveContainer width="100%" height={Math.max(250, data.length * 40)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          onClick={(e) => {
            if (e && e.activeLabel) {
              onPageSelect(e.activeLabel as string);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="page" type="category" width={95} fontSize={11} />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#667eea" />
          <Bar dataKey="unique_visitors" fill="#764ba2" />
          <Bar dataKey="unique_ips" fill="#f093fb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
