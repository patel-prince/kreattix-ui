import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface SidebarNavItemData {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarNavGroupData {
  title?: React.ReactNode;
  items: SidebarNavItemData[];
}

export interface SidebarNavProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentProps<'root' | 'group' | 'item'> {
  groups: SidebarNavGroupData[];
  collapsed?: boolean;
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'SidebarNav',
    rawProps
  );
  const {
    groups,
    collapsed = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <nav
      ref={ref}
      aria-label="Sidebar navigation"
      data-kx="sidebar-nav"
      data-slot="root"
      data-collapsed={collapsed || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-sidebar-nav', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {groups.map((group, gIdx) => (
        <div key={gIdx} data-slot="group" className={getSlotClass('group', 'kx-sidebar-group')}>
          {group.title && !collapsed && (
            <div className={isUnstyled ? undefined : 'kx-sidebar-group-title'}>{group.title}</div>
          )}
          <ul className={isUnstyled ? undefined : 'kx-sidebar-list'}>
            {group.items.map((item) => {
              const Tag = item.href ? 'a' : 'button';
              return (
                <li key={item.id}>
                  <Tag
                    href={item.href}
                    type={item.href ? undefined : 'button'}
                    onClick={item.onClick}
                    data-active={item.active || undefined}
                    aria-current={item.active ? 'page' : undefined}
                    data-slot="item"
                    className={getSlotClass('item', 'kx-sidebar-item')}
                  >
                    {item.icon && <span className={isUnstyled ? undefined : 'kx-icon'}>{item.icon}</span>}
                    {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                    {!collapsed && item.badge}
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
});
