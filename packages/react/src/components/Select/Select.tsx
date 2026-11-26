import React, { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  Field,
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    FieldControlProps,
    BaseComponentProps<'trigger' | 'content' | 'item'> {
  id?: string;
  placeholder?: string;
  options?: SelectOption[];
  className?: string;
  style?: React.CSSProperties;
}

const SelectRoot = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(function Select(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Select', rawProps);
  const chevronGlyph = useInternalGlyph('chevronDown');

  const {
    id: idProp,
    label,
    description,
    error,
    required,
    placeholder = 'Select an option...',
    options,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rootProps
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(idProp);
  const labelId = `${id}-label`;

  const selectEl = (
    <SelectPrimitive.Root required={required} {...rootProps}>
      <SelectPrimitive.Trigger
        ref={ref}
        id={id}
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={buildAriaDescribedBy(
          Boolean(description && !error),
          Boolean(error),
          descriptionId,
          errorId
        )}
        data-kx="select"
        data-slot="trigger"
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('trigger', 'kx-select-trigger', className)}
        style={getSlotStyle('trigger', style)}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className={isUnstyled ? undefined : 'kx-icon'}>
          {chevronGlyph}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          data-slot="content"
          className={getSlotClass('content', 'kx-select-content')}
          style={getSlotStyle('content')}
        >
          <SelectPrimitive.Viewport>
            {options
              ? options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    unstyled={isUnstyled}
                  >
                    {opt.label}
                  </SelectItem>
                ))
              : children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );

  if (!label && !description && !error) return selectEl;

  return (
    <Field
      htmlFor={id}
      labelAs="span"
      labelId={labelId}
      label={label}
      description={description}
      error={error}
      required={required}
      unstyled={isUnstyled}
    >
      {selectEl}
    </Field>
  );
});

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  unstyled?: boolean;
}

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(function SelectItem({ children, className, unstyled, ...rest }, ref) {
  const checkGlyph = useInternalGlyph('check');
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="item"
      className={unstyled ? className : className ? `kx-select-item ${className}` : 'kx-select-item'}
      {...rest}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={unstyled ? undefined : 'kx-icon'}>
        {checkGlyph}
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...rest }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={className ? `kx-select-label ${className}` : 'kx-select-label'}
      {...rest}
    />
  );
});

export const Select = Object.assign(SelectRoot, {
  Root: SelectPrimitive.Root,
  Trigger: SelectPrimitive.Trigger,
  Value: SelectPrimitive.Value,
  Content: SelectPrimitive.Content,
  Viewport: SelectPrimitive.Viewport,
  Group: SelectPrimitive.Group,
  Label: SelectLabel,
  Item: SelectItem,
});
