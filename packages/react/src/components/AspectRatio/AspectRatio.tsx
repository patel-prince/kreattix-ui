import React, { forwardRef } from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>,
    BaseComponentProps<'root'> {}

export const AspectRatio = forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(function AspectRatio(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'AspectRatio',
    rawProps
  );
  const {
    ratio = 16 / 9,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      ratio={ratio}
      data-kx="aspect-ratio"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-aspect-ratio', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});
