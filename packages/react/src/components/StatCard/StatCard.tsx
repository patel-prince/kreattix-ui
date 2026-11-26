import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root' | 'label' | 'value' | 'delta'> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'StatCard',
    rawProps
  );
  const {
    label,
    value,
    delta,
    trend = 'neutral',
    icon,
    footer,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      data-kx="stat-card"
      data-slot="root"
      data-trend={trend}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-stat-card', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <div className={isUnstyled ? undefined : 'kx-stat-top'}>
        <span
          data-slot="label"
          className={getSlotClass('label', 'kx-stat-label')}
          style={getSlotStyle('label')}
        >
          {label}
        </span>
        {icon && <span className={isUnstyled ? undefined : 'kx-icon'}>{icon}</span>}
      </div>
      <div className={isUnstyled ? undefined : 'kx-stat-row'}>
        <span
          data-slot="value"
          className={getSlotClass('value', 'kx-stat-value')}
          style={getSlotStyle('value')}
        >
          {value}
        </span>
        {delta && (
          <span
            data-slot="delta"
            data-trend={trend}
            className={getSlotClass('delta', 'kx-stat-delta')}
            style={getSlotStyle('delta')}
          >
            {delta}
          </span>
        )}
      </div>
      {footer && <div className={isUnstyled ? undefined : 'kx-stat-footer'}>{footer}</div>}
    </div>
  );
});
