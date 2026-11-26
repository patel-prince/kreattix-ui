import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export type AccordionProps = (
  | React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
) &
  BaseComponentProps<'root' | 'item' | 'trigger' | 'content'> & {
    variant?: 'bordered' | 'ghost';
    items?: AccordionItemData[];
  };

const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(function Accordion(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Accordion',
    rawProps
  );
  const {
    variant = 'bordered',
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
    <AccordionPrimitive.Root
      ref={ref}
      data-kx="accordion"
      data-slot="root"
      data-variant={variant}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-accordion', className)}
      style={getSlotStyle('root', style)}
      {...(rest as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    >
      {items
        ? items.map((item) => (
            <AccordionItem key={item.value} value={item.value} disabled={item.disabled} unstyled={isUnstyled}>
              <AccordionTrigger unstyled={isUnstyled}>{item.title}</AccordionTrigger>
              <AccordionContent unstyled={isUnstyled}>{item.content}</AccordionContent>
            </AccordionItem>
          ))
        : children}
    </AccordionPrimitive.Root>
  );
});

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { unstyled?: boolean }
>(function AccordionItem({ unstyled, className, ...rest }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={unstyled ? className : className ? `kx-accordion-item ${className}` : 'kx-accordion-item'}
      {...rest}
    />
  );
});

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { unstyled?: boolean }
>(function AccordionTrigger({ unstyled, className, children, ...rest }, ref) {
  const chevronGlyph = useInternalGlyph('chevronDown');
  return (
    <AccordionPrimitive.Header style={{ margin: 0 }}>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={
          unstyled ? className : className ? `kx-accordion-trigger ${className}` : 'kx-accordion-trigger'
        }
        {...rest}
      >
        <span>{children}</span>
        <span className={unstyled ? undefined : 'kx-icon kx-accordion-chevron'} aria-hidden="true">
          {chevronGlyph}
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { unstyled?: boolean }
>(function AccordionContent({ unstyled, className, children, ...rest }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={
        unstyled ? className : className ? `kx-accordion-content ${className}` : 'kx-accordion-content'
      }
      {...rest}
    >
      {children}
    </AccordionPrimitive.Content>
  );
});

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
