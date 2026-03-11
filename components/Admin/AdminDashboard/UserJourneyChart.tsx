'use client';

import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';

type SankeyNode = {
  name: string;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

type Props = {
  data: SankeyData;
};

export function UserJourneyChart({ data }: Props) {
  if (data.links.length === 0) {
    return null;
  }

  return (
    <div className={styles.chartSection}>
      <h2>User Journey: Source → Page → Action</h2>
      <p className={styles.chartDescription}>
        Shows how visitors flow from traffic sources through pages to their actions (view/complete)
      </p>
      <ResponsiveContainer width="100%" height={Math.max(400, data.nodes.length * 30)}>
        <Sankey
          data={data}
          node={{ fill: '#667eea', fillOpacity: 1 }}
          link={{ stroke: '#d084d0', strokeOpacity: 0.5 }}
          nodePadding={50}
          margin={{ top: 20, right: 100, bottom: 20, left: 100 }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
