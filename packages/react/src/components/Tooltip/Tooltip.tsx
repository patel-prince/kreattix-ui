import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface TooltipProps extends BaseComponentProps<'content'> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const TooltipProvider = TooltipPrimitive.Provider;

function TooltipRoot(rawProps: TooltipProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Tooltip', rawProps);
  const {
    content,
    children,
    side = 'top',
    sideOffset = 6,
    delayDuration = 200,
    open,
    defaultOpen,
    onOpenChange,
  } = props;

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            data-kx="tooltip"
            data-slot="content"
            data-unstyled={isUnstyled || undefined}
            className={getSlotClass('content', 'kx-tooltip-content')}
            style={getSlotStyle('content')}
          >
            {content}
            <TooltipPrimitive.Arrow className={isUnstyled ? undefined : 'kx-tooltip-arrow'} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipPrimitive.Provider,
  Root: TooltipPrimitive.Root,
  Trigger: TooltipPrimitive.Trigger,
  Portal: TooltipPrimitive.Portal,
  Content: TooltipPrimitive.Content,
  Arrow: TooltipPrimitive.Arrow,
});
