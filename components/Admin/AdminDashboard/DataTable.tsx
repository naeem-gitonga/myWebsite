'use client';

import { useState } from 'react';
import type { AnalyticsRow } from '@/utils/chartDataTransformers';
import { formatDevice } from '@/utils/chartDataTransformers';
import styles from './AdminDashboard.module.scss';

type Props = {
  data: AnalyticsRow[];
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
};

const DEFAULT_COLUMNS = ['timestamp', 'page', 'fromwebsite', 'sessionid', 'userId', 'device', 'eventtype', 'views'];

export function DataTable({ data, sortKey: initialSortKey = 'views', sortOrder: initialSortOrder = 'desc' }: Props) {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, column: string) => {
    setDraggedColumn(column);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, targetColumn: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumn) {
      setDraggedColumn(null);
      return;
    }

    const draggedIndex = columns.indexOf(draggedColumn);
    const targetIndex = columns.indexOf(targetColumn);

    const newColumns = [...columns];
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedColumn);

    setColumns(newColumns);
    setDraggedColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = parseFloat(a[sortKey as keyof AnalyticsRow] || '0');
    const bVal = parseFloat(b[sortKey as keyof AnalyticsRow] || '0');

    if (sortOrder === 'asc') {
      return aVal - bVal;
    }
    return bVal - aVal;
  });

  return (
    <div className={styles.tableSection}>
      <h2>Raw Data</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  onDragStart={(e) => handleDragStart(e, key)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, key)}
                  onDragEnd={handleDragEnd}
                  draggable
                  className={`${styles.sortable} ${draggedColumn === key ? styles.dragging : ''}`}
                  style={{ opacity: draggedColumn === key ? 0.5 : 1, cursor: 'grab' }}
                >
                  {key === 'fromwebsite' ? 'Traffic Source' : key}{' '}
                  {sortKey === key && (
                    <span className={styles.sortIcon}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((key) => (
                  <td key={key} className={key === 'sessionid' ? styles.sessionId : ''}>
                    {key === 'device' ? formatDevice(row[key as keyof AnalyticsRow] as string) : row[key as keyof AnalyticsRow]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
