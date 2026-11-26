import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextTone = 'primary' | 'secondary' | 'muted' | 'brand' | 'success' | 'warning' | 'danger';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentProps<'root'> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
  asChild?: boolean;
  size?: TextSize;
  tone?: TextTone;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  truncate?: boolean;
}

const WEIGHT_MAP = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const Text = forwardRef<HTMLElement, TextProps>(function Text(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Text', rawProps);
  const {
    as = 'p',
    asChild = false,
    size = 'md',
    tone = 'primary',
    weight,
    truncate = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const Comp = (asChild ? Slot : as) as React.ElementType;

  return (
    <Comp
      ref={ref}
      data-kx="text"
      data-slot="root"
      data-size={size}
      data-tone={tone}
      data-truncate={truncate || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-text', className)}
      style={getSlotStyle('root', {
        ...(weight ? { fontWeight: WEIGHT_MAP[weight] } : {}),
        ...(style ?? {}),
      })}
      {...rest}
    />
  );
});
