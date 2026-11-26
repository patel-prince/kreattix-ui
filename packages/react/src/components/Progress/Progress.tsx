import React, { forwardRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    BaseComponentProps<'root' | 'indicator'> {
  size?: ProgressSize;
  tone?: ProgressTone;
  label?: React.ReactNode;
  showValue?: boolean;
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Progress', rawProps);
  const {
    value = 0,
    max = 100,
    size = 'md',
    tone = 'primary',
    label,
    showValue = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const pct = Math.max(0, Math.min(100, ((value ?? 0) / max) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8125rem',
            color: 'var(--kx-text-secondary)',
          }}
        >
          <span>{label}</span>
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        value={value}
        max={max}
        data-kx="progress"
        data-slot="root"
        data-size={size}
        data-tone={tone}
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('root', 'kx-progress', className)}
        style={getSlotStyle('root', style)}
        {...rest}
      >
        <ProgressPrimitive.Indicator
          data-slot="indicator"
          className={getSlotClass('indicator', 'kx-progress-indicator')}
          style={getSlotStyle('indicator', {
            transform: `translateX(-${100 - pct}%)`,
          })}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
