'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { AnalyticsRow } from '@/utils/chartDataTransformers';
import { formatDevice, formatTimestamp } from '@/utils/chartDataTransformers';
import styles from './AdminDashboard.module.scss';

type Props = {
  data: AnalyticsRow[];
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
};

const DEFAULT_COLUMNS = ['timestamp', 'page', 'fromwebsite', 'sessionid', 'userid', 'device', 'eventtype', 'ip', 'views'];
const DEFAULT_WIDTHS: Record<string, number> = {
  timestamp: 160,
  page: 140,
  fromwebsite: 120,
  sessionid: 100,
  userid: 120,
  device: 140,
  eventtype: 110,
  ip: 140,
  views: 80,
};

export function DataTable({ data, sortKey: initialSortKey = 'views', sortOrder: initialSortOrder = 'desc' }: Props) {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(DEFAULT_WIDTHS);
  const [resizingColumn, setResizingColumn] = useState<{ col: string; startX: number; startWidth: number } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

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

  const handleResizeStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn({ col: column, startX: e.clientX, startWidth: columnWidths[column] });
  };

  useEffect(() => {
    if (!resizingColumn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizingColumn.startX;
      const newWidth = Math.max(50, resizingColumn.startWidth + diff);
      setColumnWidths((prev) => ({
        ...prev,
        [resizingColumn.col]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn]);

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey as keyof AnalyticsRow] || '';
    const bVal = b[sortKey as keyof AnalyticsRow] || '';

    // Sort timestamps as dates
    if (sortKey === 'timestamp') {
      const aTime = new Date(String(aVal)).getTime();
      const bTime = new Date(String(bVal)).getTime();
      return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
    }

    // Try numeric sort
    const aNum = parseFloat(String(aVal));
    const bNum = parseFloat(String(bVal));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
    }

    // Fall back to string sort
    const aStr = String(aVal);
    const bStr = String(bVal);
    return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  return (
    <div className={styles.tableSection}>
      <h2>Raw Data</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table} ref={tableRef}>
          <thead>
            <tr>
              {columns.map((key, idx) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  onDragStart={(e) => handleDragStart(e, key)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, key)}
                  onDragEnd={handleDragEnd}
                  draggable
                  className={`${styles.sortable} ${draggedColumn === key ? styles.dragging : ''}`}
                  style={{
                    opacity: draggedColumn === key ? 0.5 : 1,
                    cursor: 'grab',
                    position: 'relative',
                    width: columnWidths[key],
                    minWidth: columnWidths[key],
                  }}
                >
                  <div className={styles.headerContent}>
                    {key === 'fromwebsite' ? 'Traffic Source' : key}{' '}
                    {sortKey === key && (
                      <span className={styles.sortIcon}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                  {idx < columns.length - 1 && (
                    <div
                      className={styles.resizeHandle}
                      onMouseDown={(e) => handleResizeStart(e, key)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((key) => (
                  <td
                    key={key}
                    className={key === 'sessionid' ? styles.sessionId : ''}
                    style={{
                      width: columnWidths[key],
                      minWidth: columnWidths[key],
                    }}
                  >
                    {key === 'device'
                      ? formatDevice(row[key as keyof AnalyticsRow] as string)
                      : key === 'timestamp'
                      ? formatTimestamp(row[key as keyof AnalyticsRow] as string)
                      : row[key as keyof AnalyticsRow]}
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
