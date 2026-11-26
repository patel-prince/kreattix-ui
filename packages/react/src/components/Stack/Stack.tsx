import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  asChild?: boolean;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: string | number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
}

function resolveGap(gap?: string | number): string | undefined {
  if (gap === undefined) return 'var(--kx-space-3, 0.75rem)';
  if (typeof gap === 'number') return `var(--kx-space-${gap}, ${gap * 0.25}rem)`;
  return gap;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Stack', rawProps);
  const {
    asChild = false,
    direction = 'column',
    gap,
    align,
    justify,
    wrap,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';
  const computedStyle: React.CSSProperties = {
    flexDirection: direction,
    gap: resolveGap(gap),
    ...(align ? { alignItems: align } : {}),
    ...(justify ? { justifyContent: justify } : {}),
    ...(wrap ? { flexWrap: wrap } : {}),
    ...(style ?? {}),
  };

  return (
    <Comp
      ref={ref}
      data-kx="stack"
      data-slot="root"
      data-direction={direction}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-stack', className)}
      style={getSlotStyle('root', computedStyle)}
      {...rest}
    />
  );
});

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  function HStack(props, ref) {
    return <Stack ref={ref} direction="row" align="center" {...props} />;
  }
);

export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  function VStack(props, ref) {
    return <Stack ref={ref} direction="column" {...props} />;
  }
);
