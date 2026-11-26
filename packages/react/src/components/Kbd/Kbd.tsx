import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentProps<'root'> {
  size?: 'sm' | 'md';
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Kbd', rawProps);
  const {
    size = 'md',
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <kbd
      ref={ref}
      data-kx="kbd"
      data-slot="root"
      data-size={size}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-kbd', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});
