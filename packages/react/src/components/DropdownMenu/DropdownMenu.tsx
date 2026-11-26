import React, { forwardRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface DropdownMenuItemData {
  label: React.ReactNode;
  onSelect?: () => void;
  shortcut?: string;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  separatorBefore?: boolean;
}

export interface DropdownMenuProps extends BaseComponentProps<'content' | 'item'> {
  trigger?: React.ReactNode;
  items?: DropdownMenuItemData[];
  children?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenuRoot(rawProps: DropdownMenuProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'DropdownMenu',
    rawProps
  );
  const {
    trigger,
    items,
    children,
    align = 'end',
    sideOffset = 6,
    open,
    defaultOpen,
    onOpenChange,
  } = props;

  if (!trigger) {
    return (
      <DropdownMenuPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </DropdownMenuPrimitive.Root>
    );
  }

  return (
    <DropdownMenuPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          data-kx="dropdown-menu"
          data-slot="content"
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-menu-content')}
          style={getSlotStyle('content')}
        >
          {items
            ? items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.separatorBefore && <DropdownMenuSeparator unstyled={isUnstyled} />}
                  <DropdownMenuItem
                    disabled={item.disabled}
                    tone={item.tone}
                    shortcut={item.shortcut}
                    onSelect={item.onSelect}
                    unstyled={isUnstyled}
                  >
                    {item.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))
            : children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    tone?: 'default' | 'danger';
    shortcut?: string;
    unstyled?: boolean;
  }
>(function DropdownMenuItem({ tone = 'default', shortcut, unstyled, className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-tone={tone}
      className={unstyled ? className : className ? `kx-menu-item ${className}` : 'kx-menu-item'}
      {...rest}
    >
      <span>{children}</span>
      {shortcut && (
        <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>{shortcut}</span>
      )}
    </DropdownMenuPrimitive.Item>
  );
});

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & { unstyled?: boolean }
>(function DropdownMenuSeparator({ unstyled, className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={
        unstyled ? className : className ? `kx-menu-separator ${className}` : 'kx-menu-separator'
      }
      {...rest}
    />
  );
});

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuPrimitive.Root,
  Trigger: DropdownMenuPrimitive.Trigger,
  Portal: DropdownMenuPrimitive.Portal,
  Content: DropdownMenuPrimitive.Content,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Label: DropdownMenuPrimitive.Label,
  Group: DropdownMenuPrimitive.Group,
});
