import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    BaseComponentProps<'root'> {
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Table', rawProps);
  const {
    striped = false,
    hoverable = true,
    stickyHeader = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <div className={isUnstyled ? undefined : 'kx-table-wrap'}>
      <table
        ref={ref}
        data-kx="table"
        data-slot="root"
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
        data-sticky-header={stickyHeader || undefined}
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('root', 'kx-table', className)}
        style={getSlotStyle('root', style)}
        {...rest}
      />
    </div>
  );
});

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader(props, ref) {
  return <thead ref={ref} {...props} />;
});

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody(props, ref) {
  return <tbody ref={ref} {...props} />;
});

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  function TableRow(props, ref) {
    return <tr ref={ref} {...props} />;
  }
);

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead(props, ref) {
  return <th ref={ref} {...props} />;
});

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell(props, ref) {
  return <td ref={ref} {...props} />;
});

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});
