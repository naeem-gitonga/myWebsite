'use client';

import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#fa709a'];

type ChartData = {
  [key: string]: string | number;
};

type Props = {
  data: ChartData[];
};

export function TrafficByDeviceChart({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  // Add colors to data items
  const dataWithColors = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  } as ChartData & { fill: string }));

  return (
    <div className={styles.chartSection}>
      <h2>Traffic by Device</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithColors}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            dataKey="value"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
