import React, { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface NavigationMenuItemData {
  label: React.ReactNode;
  href?: string;
  children?: { title: React.ReactNode; description?: React.ReactNode; href: string }[];
}

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>,
    BaseComponentProps<'root' | 'list' | 'trigger' | 'content' | 'link'> {
  items?: NavigationMenuItemData[];
}

const NavigationMenuRoot = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(function NavigationMenu(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'NavigationMenu',
    rawProps
  );
  const chevron = useInternalGlyph('chevronDown');
  const {
    items,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-kx="navigation-menu"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-navmenu', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {items ? (
        <NavigationMenuPrimitive.List
          data-slot="list"
          className={getSlotClass('list', 'kx-navmenu-list')}
        >
          {items.map((item, idx) => (
            <NavigationMenuPrimitive.Item key={idx}>
              {item.children ? (
                <>
                  <NavigationMenuPrimitive.Trigger
                    data-slot="trigger"
                    className={getSlotClass('trigger', 'kx-navmenu-trigger')}
                  >
                    <span>{item.label}</span>
                    <span className={isUnstyled ? undefined : 'kx-icon'}>{chevron}</span>
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuPrimitive.Content
                    data-slot="content"
                    className={getSlotClass('content', 'kx-navmenu-content')}
                  >
                    <ul className={isUnstyled ? undefined : 'kx-navmenu-grid'}>
                      {item.children.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <NavigationMenuPrimitive.Link
                            href={sub.href}
                            className={isUnstyled ? undefined : 'kx-navmenu-card-link'}
                          >
                            <div className={isUnstyled ? undefined : 'kx-navmenu-card-title'}>
                              {sub.title}
                            </div>
                            {sub.description && (
                              <p className={isUnstyled ? undefined : 'kx-navmenu-card-desc'}>
                                {sub.description}
                              </p>
                            )}
                          </NavigationMenuPrimitive.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuPrimitive.Content>
                </>
              ) : (
                <NavigationMenuPrimitive.Link
                  href={item.href}
                  data-slot="link"
                  className={getSlotClass('link', 'kx-navmenu-link')}
                >
                  {item.label}
                </NavigationMenuPrimitive.Link>
              )}
            </NavigationMenuPrimitive.Item>
          ))}
        </NavigationMenuPrimitive.List>
      ) : (
        children
      )}
      <div className={isUnstyled ? undefined : 'kx-navmenu-viewport-wrap'}>
        <NavigationMenuPrimitive.Viewport
          className={isUnstyled ? undefined : 'kx-navmenu-viewport'}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
});

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Root: NavigationMenuPrimitive.Root,
  List: NavigationMenuPrimitive.List,
  Item: NavigationMenuPrimitive.Item,
  Trigger: NavigationMenuPrimitive.Trigger,
  Content: NavigationMenuPrimitive.Content,
  Link: NavigationMenuPrimitive.Link,
  Viewport: NavigationMenuPrimitive.Viewport,
});
