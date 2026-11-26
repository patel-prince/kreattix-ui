import React, { forwardRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  Field,
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    FieldControlProps,
    BaseComponentProps<'root' | 'wrapper' | 'input' | 'leftAddon' | 'rightAddon'> {
  size?: InputSize;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Input', rawProps);
  const closeGlyph = useInternalGlyph('close');

  const {
    id: idProp,
    label,
    description,
    error,
    required,
    size = 'md',
    leftAddon,
    rightAddon,
    clearable = false,
    onClear,
    disabled = false,
    value,
    defaultValue,
    onChange,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    'aria-describedby': ariaDescribedByProp,
    ...rest
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(idProp);
  const [internalVal, setInternalVal] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentVal = isControlled ? value : internalVal;
  const showClear = clearable && !disabled && String(currentVal ?? '').length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalVal(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalVal('');
    onClear?.();
  };

  const control = (
    <div
      data-kx="input"
      data-slot="wrapper"
      data-size={size}
      data-invalid={Boolean(error) || undefined}
      data-disabled={disabled || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('wrapper', 'kx-input-wrap', className)}
      style={getSlotStyle('wrapper', style)}
    >
      {leftAddon && (
        <span
          data-slot="leftAddon"
          className={getSlotClass('leftAddon', 'kx-icon')}
          style={getSlotStyle('leftAddon')}
          aria-hidden="true"
        >
          {leftAddon}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        required={required}
        value={isControlled ? value : internalVal}
        onChange={handleChange}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={buildAriaDescribedBy(
          Boolean(description && !error),
          Boolean(error),
          descriptionId,
          errorId,
          ariaDescribedByProp
        )}
        data-slot="input"
        className={getSlotClass('input', 'kx-input')}
        style={getSlotStyle('input')}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear input"
          className={isUnstyled ? undefined : 'kx-input-clear'}
        >
          {closeGlyph}
        </button>
      )}
      {rightAddon && (
        <span
          data-slot="rightAddon"
          className={getSlotClass('rightAddon', 'kx-icon')}
          style={getSlotStyle('rightAddon')}
          aria-hidden="true"
        >
          {rightAddon}
        </span>
      )}
    </div>
  );

  if (!label && !description && !error) {
    return control;
  }

  return (
    <Field
      htmlFor={id}
      label={label}
      description={description}
      error={error}
      required={required}
      unstyled={isUnstyled}
    >
      {control}
    </Field>
  );
});
