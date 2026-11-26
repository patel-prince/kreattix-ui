import React, { forwardRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    BaseComponentProps<'root' | 'viewport' | 'scrollbar' | 'thumb'> {
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(function ScrollArea(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'ScrollArea',
    rawProps
  );
  const {
    orientation = 'vertical',
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-kx="scroll-area"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-scroll-area', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="viewport"
        className={getSlotClass('viewport', 'kx-scroll-viewport')}
        style={getSlotStyle('viewport')}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          data-slot="scrollbar"
          className={getSlotClass('scrollbar', 'kx-scrollbar')}
          style={getSlotStyle('scrollbar')}
        >
          <ScrollAreaPrimitive.Thumb
            data-slot="thumb"
            className={getSlotClass('thumb', 'kx-scrollbar-thumb')}
            style={getSlotStyle('thumb')}
          />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          data-slot="scrollbar"
          className={getSlotClass('scrollbar', 'kx-scrollbar')}
          style={getSlotStyle('scrollbar')}
        >
          <ScrollAreaPrimitive.Thumb
            data-slot="thumb"
            className={getSlotClass('thumb', 'kx-scrollbar-thumb')}
            style={getSlotStyle('thumb')}
          />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
