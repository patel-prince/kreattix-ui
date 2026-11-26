import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface HoverCardProps extends BaseComponentProps<'content'> {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  openDelay?: number;
  closeDelay?: number;
}

function HoverCardRoot(rawProps: HoverCardProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'HoverCard',
    rawProps
  );
  const {
    trigger,
    content,
    children,
    side = 'bottom',
    align = 'center',
    openDelay = 250,
    closeDelay = 150,
  } = props;

  if (!trigger) {
    return (
      <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
        {children}
      </HoverCardPrimitive.Root>
    );
  }

  return (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          data-kx="hover-card"
          data-slot="content"
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-popover-content')}
          style={getSlotStyle('content', { width: '18rem' })}
        >
          {content ?? children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

export const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardPrimitive.Root,
  Trigger: HoverCardPrimitive.Trigger,
  Portal: HoverCardPrimitive.Portal,
  Content: HoverCardPrimitive.Content,
});
