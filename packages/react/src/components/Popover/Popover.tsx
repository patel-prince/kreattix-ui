import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface PopoverProps extends BaseComponentProps<'content'> {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function PopoverRoot(rawProps: PopoverProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Popover', rawProps);
  const {
    trigger,
    content,
    children,
    side = 'bottom',
    align = 'center',
    sideOffset = 6,
    open,
    defaultOpen,
    onOpenChange,
  } = props;

  if (!trigger) {
    return (
      <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    );
  }

  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          data-kx="popover"
          data-slot="content"
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-popover-content')}
          style={getSlotStyle('content')}
        >
          {content ?? children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverPrimitive.Root,
  Trigger: PopoverPrimitive.Trigger,
  Anchor: PopoverPrimitive.Anchor,
  Portal: PopoverPrimitive.Portal,
  Content: PopoverPrimitive.Content,
  Close: PopoverPrimitive.Close,
});
