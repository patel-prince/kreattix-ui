import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentProps<'root' | 'button'> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function getPages(current: number, total: number, siblings: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const result: (number | '...')[] = [1];
  if (left > 2) result.push('...');
  for (let p = left; p <= right; p++) result.push(p);
  if (right < total - 1) result.push('...');
  result.push(total);
  return result;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Pagination',
    rawProps
  );
  const {
    page,
    totalPages,
    onPageChange,
    siblingCount = 1,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const pages = getPages(page, totalPages, siblingCount);

  return (
    <nav
      ref={ref}
      aria-label="Pagination"
      data-kx="pagination"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-pagination', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        data-slot="button"
        className={getSlotClass('button', 'kx-page-btn')}
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`e-${idx}`} className={isUnstyled ? undefined : 'kx-page-ellipsis'}>
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            data-active={p === page || undefined}
            onClick={() => onPageChange(p)}
            data-slot="button"
            className={getSlotClass('button', 'kx-page-btn')}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        data-slot="button"
        className={getSlotClass('button', 'kx-page-btn')}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
});
