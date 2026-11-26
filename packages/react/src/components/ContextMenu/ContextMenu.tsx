import React, { forwardRef } from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface ContextMenuItemData {
  label: React.ReactNode;
  shortcut?: string;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  separatorBefore?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuProps extends BaseComponentProps<'content' | 'item'> {
  children: React.ReactNode;
  items?: ContextMenuItemData[];
}

function ContextMenuRoot(rawProps: ContextMenuProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'ContextMenu',
    rawProps
  );
  const { children, items } = props;

  if (!items) {
    return <ContextMenuPrimitive.Root>{children}</ContextMenuPrimitive.Root>;
  }

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild>{children}</ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          data-kx="context-menu"
          data-slot="content"
          data-unstyled={isUnstyled || undefined}
          className={getSlotClass('content', 'kx-menu-content')}
          style={getSlotStyle('content')}
        >
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.separatorBefore && (
                <ContextMenuPrimitive.Separator
                  className={isUnstyled ? undefined : 'kx-menu-separator'}
                />
              )}
              <ContextMenuPrimitive.Item
                disabled={item.disabled}
                onSelect={item.onSelect}
                data-tone={item.tone ?? 'default'}
                data-slot="item"
                className={getSlotClass('item', 'kx-menu-item')}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>
                    {item.shortcut}
                  </span>
                )}
              </ContextMenuPrimitive.Item>
            </React.Fragment>
          ))}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}

const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    tone?: 'default' | 'danger';
  }
>(function ContextMenuItem({ tone = 'default', className, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      data-tone={tone}
      className={className ? `kx-menu-item ${className}` : 'kx-menu-item'}
      {...rest}
    />
  );
});

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Root: ContextMenuPrimitive.Root,
  Trigger: ContextMenuPrimitive.Trigger,
  Portal: ContextMenuPrimitive.Portal,
  Content: ContextMenuPrimitive.Content,
  Item: ContextMenuItem,
  Separator: ContextMenuPrimitive.Separator,
});
