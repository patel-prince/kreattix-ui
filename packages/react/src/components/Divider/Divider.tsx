import React, { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    BaseComponentProps<'root' | 'label'> {
  /**
   * Optional centered label inside a horizontal divider.
   */
  label?: React.ReactNode;
}

export const Divider = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(function Divider(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Divider', rawProps);
  const {
    orientation = 'horizontal',
    decorative = true,
    label,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  if (label && orientation === 'horizontal') {
    return (
      <div
        role={decorative ? 'none' : 'separator'}
        data-kx="divider"
        data-slot="root"
        data-orientation="horizontal"
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('root', 'kx-divider-with-label', className)}
        style={getSlotStyle('root', style)}
      >
        <span className={isUnstyled ? undefined : 'kx-divider-line'} />
        <span data-slot="label" className={getSlotClass('label', '')} style={getSlotStyle('label')}>
          {label}
        </span>
        <span className={isUnstyled ? undefined : 'kx-divider-line'} />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      data-kx="divider"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-divider', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});
