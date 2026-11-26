import React, { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface MenubarMenuData {
  label: React.ReactNode;
  items: { label: React.ReactNode; shortcut?: string; onSelect?: () => void; separatorBefore?: boolean }[];
}

export interface MenubarProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>,
    BaseComponentProps<'root' | 'trigger' | 'content' | 'item'> {
  menus?: MenubarMenuData[];
}

const MenubarRoot = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(function Menubar(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Menubar', rawProps);
  const {
    menus,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <MenubarPrimitive.Root
      ref={ref}
      data-kx="menubar"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-menubar', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {menus
        ? menus.map((menu, idx) => (
            <MenubarPrimitive.Menu key={idx}>
              <MenubarPrimitive.Trigger
                data-slot="trigger"
                className={getSlotClass('trigger', 'kx-menubar-trigger')}
              >
                {menu.label}
              </MenubarPrimitive.Trigger>
              <MenubarPrimitive.Portal>
                <MenubarPrimitive.Content
                  align="start"
                  sideOffset={4}
                  data-slot="content"
                  className={getSlotClass('content', 'kx-menu-content')}
                >
                  {menu.items.map((item, iIdx) => (
                    <React.Fragment key={iIdx}>
                      {item.separatorBefore && (
                        <MenubarPrimitive.Separator
                          className={isUnstyled ? undefined : 'kx-menu-separator'}
                        />
                      )}
                      <MenubarPrimitive.Item
                        onSelect={item.onSelect}
                        data-slot="item"
                        className={getSlotClass('item', 'kx-menu-item')}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>
                            {item.shortcut}
                          </span>
                        )}
                      </MenubarPrimitive.Item>
                    </React.Fragment>
                  ))}
                </MenubarPrimitive.Content>
              </MenubarPrimitive.Portal>
            </MenubarPrimitive.Menu>
          ))
        : children}
    </MenubarPrimitive.Root>
  );
});

export const Menubar = Object.assign(MenubarRoot, {
  Root: MenubarPrimitive.Root,
  Menu: MenubarPrimitive.Menu,
  Trigger: MenubarPrimitive.Trigger,
  Content: MenubarPrimitive.Content,
  Item: MenubarPrimitive.Item,
  Separator: MenubarPrimitive.Separator,
});
