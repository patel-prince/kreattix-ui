import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentProps<'root' | 'list' | 'item' | 'separator'> {
  items: BreadcrumbItemData[];
  separator?: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Breadcrumb',
    rawProps
  );
  const chevronRight = useInternalGlyph('chevronRight');

  const {
    items,
    separator,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      data-kx="breadcrumb"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-breadcrumb', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <ol data-slot="list" className={getSlotClass('list', 'kx-breadcrumb-list')}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} data-slot="item" className={getSlotClass('item', 'kx-breadcrumb-item')}>
              {isLast ? (
                <span aria-current="page" className={isUnstyled ? undefined : 'kx-breadcrumb-current'}>
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} onClick={item.onClick} className={isUnstyled ? undefined : 'kx-breadcrumb-link'}>
                  {item.label}
                </a>
              ) : (
                <button type="button" onClick={item.onClick} className={isUnstyled ? undefined : 'kx-breadcrumb-link'}>
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  data-slot="separator"
                  className={getSlotClass('separator', 'kx-breadcrumb-sep')}
                >
                  {separator ?? chevronRight}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
