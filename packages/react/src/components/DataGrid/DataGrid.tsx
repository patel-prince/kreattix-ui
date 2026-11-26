import React, { useMemo, useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { EmptyState } from '../EmptyState/EmptyState';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination/Pagination';
import { Table } from '../Table/Table';

export interface DataGridColumn<T extends Record<string, unknown>> {
  key: keyof T & string;
  header: React.ReactNode;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataGridProps<T extends Record<string, unknown>> {
  data: T[];
  columns: DataGridColumn<T>[];
  rowKey?: keyof T & string;
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  pageSize?: number;
  emptyTitle?: React.ReactNode;
  loading?: boolean;
}

export function DataGrid<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey = 'id' as keyof T & string,
  searchable = true,
  searchPlaceholder = 'Search rows...',
  selectable = false,
  selectedKeys: controlledKeys,
  onSelectionChange,
  pageSize = 10,
  emptyTitle = 'No matching records',
  loading = false,
}: DataGridProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [internalKeys, setInternalKeys] = useState<string[]>([]);

  const selectedKeys = controlledKeys ?? internalKeys;
  const setSelected = (next: string[]) => {
    if (controlledKeys === undefined) setInternalKeys(next);
    onSelectionChange?.(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? '')
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, columns, query]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? '');
      const bv = String(b[sortKey] ?? '');
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const pageIds = paged.map((r, i) => String(r[rowKey] ?? i));
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedKeys.includes(id));

  const toggleAll = () => {
    if (allPageSelected) {
      setSelected(selectedKeys.filter((k) => !pageIds.includes(k)));
    } else {
      setSelected(Array.from(new Set([...selectedKeys, ...pageIds])));
    }
  };

  const toggleRow = (id: string) => {
    if (selectedKeys.includes(id)) {
      setSelected(selectedKeys.filter((k) => k !== id));
    } else {
      setSelected([...selectedKeys, id]);
    }
  };

  return (
    <div data-kx="data-grid" className="kx-datagrid">
      {searchable && (
        <div className="kx-datagrid-toolbar">
          <Input
            size="sm"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            clearable
            onClear={() => {
              setQuery('');
              setPage(1);
            }}
            style={{ maxWidth: '18rem' }}
          />
          <span style={{ fontSize: '0.8125rem', color: 'var(--kx-text-muted)' }}>
            {sorted.length} {sorted.length === 1 ? 'record' : 'records'}
            {selectable && selectedKeys.length > 0 ? ` • ${selectedKeys.length} selected` : ''}
          </span>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--kx-text-muted)' }}>
          Loading records...
        </div>
      ) : paged.length === 0 ? (
        <EmptyState title={emptyTitle} description="Try adjusting your search query." />
      ) : (
        <Table stickyHeader>
          <Table.Header>
            <Table.Row>
              {selectable && (
                <Table.Head style={{ width: '2.5rem' }}>
                  <Checkbox
                    checked={allPageSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all rows"
                  />
                </Table.Head>
              )}
              {columns.map((col) => (
                <Table.Head key={col.key} style={{ width: col.width }}>
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="kx-datagrid-sort-btn"
                    >
                      <span>{col.header}</span>
                      <span style={{ opacity: sortKey === col.key ? 1 : 0.35 }}>
                        {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paged.map((row, idx) => {
              const id = String(row[rowKey] ?? idx);
              return (
                <Table.Row key={id}>
                  {selectable && (
                    <Table.Cell>
                      <Checkbox
                        checked={selectedKeys.includes(id)}
                        onCheckedChange={() => toggleRow(id)}
                        aria-label={`Select row ${id}`}
                      />
                    </Table.Cell>
                  )}
                  {columns.map((col) => (
                    <Table.Cell key={col.key}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}

      {totalPages > 1 && (
        <div className="kx-datagrid-footer">
          <span style={{ fontSize: '0.8125rem', color: 'var(--kx-text-muted)' }}>
            Page {safePage} of {totalPages}
          </span>
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
