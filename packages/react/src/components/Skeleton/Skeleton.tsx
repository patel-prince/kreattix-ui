import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BaseComponentProps<'root'> {
  shape?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Skeleton', rawProps);
  const {
    shape = 'rect',
    width,
    height,
    lines,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  if (lines && lines > 1) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: width ?? '100%' }}
      >
        {Array.from({ length: lines }).map((_, idx) => (
          <span
            key={idx}
            data-kx="skeleton"
            data-slot="root"
            data-shape="text"
            data-unstyled={isUnstyled || undefined}
            className={getSlotClass('root', 'kx-skeleton', className)}
            style={getSlotStyle('root', {
              width: idx === lines - 1 ? '75%' : '100%',
              height: height ?? '0.875rem',
              ...(style ?? {}),
            })}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-kx="skeleton"
      data-slot="root"
      data-shape={shape}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-skeleton', className)}
      style={getSlotStyle('root', {
        width: width ?? (shape === 'circle' ? '2.5rem' : '100%'),
        height: height ?? (shape === 'circle' ? '2.5rem' : shape === 'text' ? '0.875rem' : '2.5rem'),
        ...(style ?? {}),
      })}
      {...rest}
    />
  );
});
