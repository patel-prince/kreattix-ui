import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  asChild?: boolean;
  /**
   * Number of columns or CSS grid-template-columns string.
   */
  columns?: number | string;
  /**
   * Responsive auto-fit minimum column width (e.g. '240px'). Overrides `columns`.
   */
  minChildWidth?: string;
  gap?: string | number;
  align?: React.CSSProperties['alignItems'];
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Grid', rawProps);
  const {
    asChild = false,
    columns = 1,
    minChildWidth,
    gap = 4,
    align,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';
  const gridTemplateColumns = minChildWidth
    ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    : typeof columns === 'number'
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;

  const computedStyle: React.CSSProperties = {
    gridTemplateColumns,
    gap: typeof gap === 'number' ? `var(--kx-space-${gap}, ${gap * 0.25}rem)` : gap,
    ...(align ? { alignItems: align } : {}),
    ...(style ?? {}),
  };

  return (
    <Comp
      ref={ref}
      data-kx="grid"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-grid', className)}
      style={getSlotStyle('root', computedStyle)}
      {...rest}
    />
  );
});
