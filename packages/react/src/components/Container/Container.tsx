import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  size?: ContainerSize;
  centered?: boolean;
  asChild?: boolean;
}

const MAX_WIDTHS: Record<ContainerSize, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  full: '100%',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Container',
    rawProps
  );
  const {
    size = 'xl',
    centered = true,
    asChild = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-kx="container"
      data-slot="root"
      data-size={size}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-container', className)}
      style={getSlotStyle('root', {
        width: '100%',
        maxWidth: MAX_WIDTHS[size],
        marginInline: centered ? 'auto' : undefined,
        ...(style ?? {}),
      })}
      {...rest}
    />
  );
});
