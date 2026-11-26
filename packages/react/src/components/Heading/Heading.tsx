import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    BaseComponentProps<'root'> {
  level?: HeadingLevel;
  size?: HeadingSize;
  asChild?: boolean;
}

const DEFAULT_SIZE_BY_LEVEL: Record<HeadingLevel, HeadingSize> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Heading', rawProps);
  const {
    level = 2,
    size,
    asChild = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Tag = (asChild ? Slot : `h${level}`) as React.ElementType;
  const resolvedSize = size ?? DEFAULT_SIZE_BY_LEVEL[level];

  return (
    <Tag
      ref={ref}
      data-kx="heading"
      data-slot="root"
      data-size={resolvedSize}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-heading', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});
