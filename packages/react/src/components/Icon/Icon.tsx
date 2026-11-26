import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconTone = 'inherit' | 'primary' | 'neutral' | 'muted' | 'success' | 'warning' | 'danger' | 'info';

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BaseComponentProps<'root'> {
  /**
   * Visual size of the icon wrapper.
   */
  size?: IconSize;
  /**
   * Semantic color tone.
   */
  tone?: IconTone;
  /**
   * Accessible label; if omitted, aria-hidden is applied.
   */
  label?: string;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Icon', rawProps);
  const {
    size = 'md',
    tone = 'inherit',
    label,
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
      data-kx="icon"
      data-slot="root"
      data-size={size}
      data-tone={tone}
      data-unstyled={isUnstyled || undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={getSlotClass('root', 'kx-icon', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {children}
    </span>
  );
});
