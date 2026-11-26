import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'ButtonGroup',
    rawProps
  );
  const {
    orientation = 'horizontal',
    attached = true,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      role="group"
      data-kx="button-group"
      data-slot="root"
      data-orientation={orientation}
      data-attached={attached || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-btn-group', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});
