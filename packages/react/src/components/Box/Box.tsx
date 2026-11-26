import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  /**
   * Merge props and behavior onto the immediate child element via Radix Slot.
   */
  asChild?: boolean;
  /**
   * Shorthand padding (CSS value or spacing token number 1-16).
   */
  p?: string | number;
  /**
   * Shorthand background surface token ('canvas' | 'surface' | 'elevated' | 'subtle' | 'muted').
   */
  surface?: 'canvas' | 'surface' | 'elevated' | 'subtle' | 'muted';
  /**
   * Shorthand border radius token ('none' | 'sm' | 'md' | 'lg' | 'xl' | 'full').
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

function resolvePadding(p?: string | number): string | undefined {
  if (p === undefined) return undefined;
  if (typeof p === 'number') return `var(--kx-space-${p}, ${p * 0.25}rem)`;
  return p;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Box', rawProps);
  const {
    asChild = false,
    p,
    surface,
    radius,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';
  const computedStyle: React.CSSProperties = {
    ...(p !== undefined ? { padding: resolvePadding(p) } : {}),
    ...(surface ? { backgroundColor: `var(--kx-bg-${surface})` } : {}),
    ...(radius ? { borderRadius: `var(--kx-radius-${radius})` } : {}),
    ...(style ?? {}),
  };

  return (
    <Comp
      ref={ref}
      data-kx="box"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-box', className)}
      style={getSlotStyle('root', computedStyle)}
      {...rest}
    />
  );
});
