import React, { forwardRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  Field,
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue' | 'size'>,
    FieldControlProps,
    BaseComponentProps<'wrapper' | 'input'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'NumberInput',
    rawProps
  );
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    value,
    defaultValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
    onValueChange,
    size = 'md',
    disabled = false,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(idProp);
  const [internalVal, setInternalVal] = useState(defaultValue);
  const current = value !== undefined ? value : internalVal;

  const commit = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (value === undefined) setInternalVal(clamped);
    onValueChange?.(clamped);
  };

  const control = (
    <div
      data-kx="number-input"
      data-slot="wrapper"
      data-size={size}
      data-invalid={Boolean(error) || undefined}
      data-disabled={disabled || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('wrapper', 'kx-input-wrap', className)}
      style={getSlotStyle('wrapper', { paddingRight: '0.25rem', ...(style ?? {}) })}
    >
      <input
        ref={ref}
        id={id}
        type="number"
        min={min === -Infinity ? undefined : min}
        max={max === Infinity ? undefined : max}
        step={step}
        disabled={disabled}
        required={required}
        value={current}
        onChange={(e) => commit(Number(e.target.value))}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={buildAriaDescribedBy(
          Boolean(description && !error),
          Boolean(error),
          descriptionId,
          errorId
        )}
        data-slot="input"
        className={getSlotClass('input', 'kx-input')}
        {...rest}
      />
      <div className={isUnstyled ? undefined : 'kx-number-steppers'}>
        <button
          type="button"
          disabled={disabled || current <= min}
          aria-label="Decrement"
          onClick={() => commit(current - step)}
          className={isUnstyled ? undefined : 'kx-number-step-btn'}
        >
          &minus;
        </button>
        <button
          type="button"
          disabled={disabled || current >= max}
          aria-label="Increment"
          onClick={() => commit(current + step)}
          className={isUnstyled ? undefined : 'kx-number-step-btn'}
        >
          +
        </button>
      </div>
    </div>
  );

  if (!label && !description && !error) return control;
  return (
    <Field htmlFor={id} label={label} description={description} error={error} required={required} unstyled={isUnstyled}>
      {control}
    </Field>
  );
});
