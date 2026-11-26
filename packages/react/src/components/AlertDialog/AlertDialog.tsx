import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Button } from '../Button/Button';

export interface AlertDialogProps
  extends BaseComponentProps<'overlay' | 'content' | 'title' | 'description'> {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  tone?: 'danger' | 'primary';
  onConfirm?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function AlertDialogRoot(rawProps: AlertDialogProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'AlertDialog',
    rawProps
  );
  const {
    trigger,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    tone = 'danger',
    onConfirm,
    open,
    onOpenChange,
    children,
  } = props;

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          data-slot="overlay"
          className={getSlotClass('overlay', 'kx-dialog-overlay')}
          style={getSlotStyle('overlay')}
        />
        <AlertDialogPrimitive.Content
          data-kx="alert-dialog"
          data-slot="content"
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-dialog-content')}
          style={getSlotStyle('content')}
        >
          {title && (
            <AlertDialogPrimitive.Title
              data-slot="title"
              className={getSlotClass('title', 'kx-dialog-title')}
            >
              {title}
            </AlertDialogPrimitive.Title>
          )}
          {description && (
            <AlertDialogPrimitive.Description
              data-slot="description"
              className={getSlotClass('description', 'kx-dialog-description')}
            >
              {description}
            </AlertDialogPrimitive.Description>
          )}
          {children && <div style={{ marginTop: '0.875rem' }}>{children}</div>}
          <div
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.625rem',
            }}
          >
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="outline">{cancelText}</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button tone={tone} onClick={onConfirm}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogPrimitive.Root,
  Trigger: AlertDialogPrimitive.Trigger,
  Content: AlertDialogPrimitive.Content,
  Title: AlertDialogPrimitive.Title,
  Description: AlertDialogPrimitive.Description,
  Cancel: AlertDialogPrimitive.Cancel,
  Action: AlertDialogPrimitive.Action,
});
