import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DialogProps
  extends BaseComponentProps<'overlay' | 'content' | 'title' | 'description'> {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  size?: DialogSize;
  showClose?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function DialogRoot(rawProps: DialogProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Dialog', rawProps);
  const closeGlyph = useInternalGlyph('close');
  const {
    trigger,
    title,
    description,
    footer,
    size = 'md',
    showClose = true,
    open,
    defaultOpen,
    onOpenChange,
    children,
  } = props;

  if (!trigger && !title) {
    return (
      <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </DialogPrimitive.Root>
    );
  }

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
          data-kx="dialog"
          data-slot="content"
          data-size={size}
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-dialog-content')}
          style={getSlotStyle('content')}
        >
          {showClose && (
            <DialogPrimitive.Close
              aria-label="Close dialog"
              className={isUnstyled ? undefined : 'kx-dialog-close'}
            >
              {closeGlyph}
            </DialogPrimitive.Close>
          )}
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
                marginTop: '1.25rem',
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

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: DialogSize;
    unstyled?: boolean;
  }
>(function DialogContent({ size = 'md', unstyled, className, children, ...rest }, ref) {
  const closeGlyph = useInternalGlyph('close');
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={unstyled ? undefined : 'kx-dialog-overlay'} />
      <DialogPrimitive.Content
        ref={ref}
        data-size={size}
        className={
          unstyled ? className : className ? `kx-dialog-content ${className}` : 'kx-dialog-content'
        }
        {...rest}
      >
        <DialogPrimitive.Close
          aria-label="Close dialog"
          className={unstyled ? undefined : 'kx-dialog-close'}
        >
          {closeGlyph}
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPrimitive.Portal,
  Overlay: DialogPrimitive.Overlay,
  Content: DialogContent,
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
  Close: DialogPrimitive.Close,
});
