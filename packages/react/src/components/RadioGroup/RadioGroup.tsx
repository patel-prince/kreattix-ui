import React, { forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    FieldControlProps,
    BaseComponentProps<'root' | 'item'> {
  options?: RadioOption[];
  variant?: 'default' | 'card';
}

const RadioGroupRoot = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'RadioGroup',
    rawProps
  );
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    options,
    variant = 'default',
    orientation = 'vertical',
    value,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;

  const content = (
    <RadioGroupPrimitive.Root
      ref={ref}
      id={id}
      aria-labelledby={label ? labelId : undefined}
      orientation={orientation}
      value={value}
      data-kx="radio-group"
      data-slot="root"
      data-orientation={orientation}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-radio-group', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {options
        ? options.map((opt) => (
            <RadioGroupItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              label={opt.label}
              description={opt.description}
              variant={variant}
              checked={value === opt.value}
              unstyled={isUnstyled}
            />
          ))
        : children}
    </RadioGroupPrimitive.Root>
  );

  if (!label && !description && !error) return content;

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
      {content}
    </Field>
  );
});

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'card';
  checked?: boolean;
  unstyled?: boolean;
}

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem(
  { id: idProp, label, description, variant = 'default', checked, unstyled, className, ...rest },
  ref
) {
  const { id } = useFieldIds(idProp);

  return (
    <label
      htmlFor={id}
      data-checked={checked || undefined}
      className={
        unstyled ? className : variant === 'card' ? 'kx-radio-card' : 'kx-radio-item-row'
      }
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        className={unstyled ? undefined : 'kx-radio'}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator
          className={unstyled ? undefined : 'kx-radio-indicator'}
        />
      </RadioGroupPrimitive.Item>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {label && (
            <LabelPrimitive.Root htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {label}
            </LabelPrimitive.Root>
          )}
          {description && (
            <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
