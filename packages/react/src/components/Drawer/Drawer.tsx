import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps
  extends BaseComponentProps<'overlay' | 'content' | 'title' | 'description'> {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  side?: DrawerSide;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function DrawerRoot(rawProps: DrawerProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Drawer', rawProps);
  const closeGlyph = useInternalGlyph('close');
  const {
    trigger,
    title,
    description,
    footer,
    side = 'right',
    open,
    defaultOpen,
    onOpenChange,
    children,
  } = props;

  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-slot="overlay"
          className={getSlotClass('overlay', 'kx-dialog-overlay')}
          style={getSlotStyle('overlay')}
        />
        <DialogPrimitive.Content
          data-kx="drawer"
          data-slot="content"
          data-side={side}
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-drawer-content')}
          style={getSlotStyle('content')}
        >
          <DialogPrimitive.Close
            aria-label="Close drawer"
            className={isUnstyled ? undefined : 'kx-dialog-close'}
          >
            {closeGlyph}
          </DialogPrimitive.Close>
          {title && (
            <DialogPrimitive.Title
              data-slot="title"
              className={getSlotClass('title', 'kx-dialog-title')}
              style={getSlotStyle('title')}
            >
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description
              data-slot="description"
              className={getSlotClass('description', 'kx-dialog-description')}
              style={getSlotStyle('description')}
            >
              {description}
            </DialogPrimitive.Description>
          )}
          <div style={{ marginTop: title || description ? '1rem' : 0 }}>{children}</div>
          {footer && (
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.625rem',
              }}
            >
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Drawer = Object.assign(DrawerRoot, {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Close: DialogPrimitive.Close,
});
