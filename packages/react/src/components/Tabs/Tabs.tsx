import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type TabsVariant = 'line' | 'pill';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    BaseComponentProps<'root' | 'list' | 'trigger' | 'content'> {
  variant?: TabsVariant;
  items?: TabItem[];
}

const TabsRoot = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(function Tabs(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Tabs', rawProps);
  const {
    variant = 'line',
    items,
    defaultValue,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const resolvedDefault = defaultValue ?? items?.[0]?.value;

  return (
    <TabsPrimitive.Root
      ref={ref}
      defaultValue={resolvedDefault}
      data-kx="tabs"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', '', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {items ? (
        <>
          <TabsList variant={variant} unstyled={isUnstyled}>
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                unstyled={isUnstyled}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value} unstyled={isUnstyled}>
              {item.content}
            </TabsContent>
          ))}
        </>
      ) : (
        children
      )}
    </TabsPrimitive.Root>
  );
});

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant;
    unstyled?: boolean;
  }
>(function TabsList({ variant = 'line', unstyled, className, ...rest }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-variant={variant}
      className={unstyled ? className : className ? `kx-tabs-list ${className}` : 'kx-tabs-list'}
      {...rest}
    />
  );
});

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { unstyled?: boolean }
>(function TabsTrigger({ unstyled, className, ...rest }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={unstyled ? className : className ? `kx-tabs-trigger ${className}` : 'kx-tabs-trigger'}
      {...rest}
    />
  );
});

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { unstyled?: boolean }
>(function TabsContent({ unstyled, className, ...rest }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={unstyled ? className : className ? `kx-tabs-content ${className}` : 'kx-tabs-content'}
      {...rest}
    />
  );
});

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
