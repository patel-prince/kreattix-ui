import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type BadgeVariant = 'soft' | 'solid' | 'outline' | 'dot';
export type BadgeTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BaseComponentProps<'root' | 'dot'> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  leftIcon?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Badge', rawProps);
  const {
    variant = 'soft',
    tone = 'primary',
    size = 'md',
    leftIcon,
    className,
    style,
    children,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <span
      ref={ref}
      data-kx="badge"
      data-slot="root"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-badge', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {variant === 'dot' && (
        <span data-slot="dot" className={getSlotClass('dot', 'kx-badge-dot')} aria-hidden="true" />
      )}
      {leftIcon}
      {children}
    </span>
  );
});
