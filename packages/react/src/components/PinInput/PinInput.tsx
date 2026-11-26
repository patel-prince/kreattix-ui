import React, { useRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';

export interface PinInputProps
  extends FieldControlProps,
    BaseComponentProps<'root' | 'cell'> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PinInput(rawProps: PinInputProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('PinInput', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    length = 6,
    value,
    defaultValue = '',
    onValueChange,
    onComplete,
    mask = false,
    disabled = false,
    className,
    style,
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;
  const [internal, setInternal] = useState(defaultValue);
  const current = (value !== undefined ? value : internal).slice(0, length);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (next: string) => {
    const clean = next.slice(0, length);
    if (value === undefined) setInternal(clean);
    onValueChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  const handleChange = (idx: number, char: string) => {
    const digit = char.slice(-1);
    const chars = Array.from({ length }, (_, i) => current[i] ?? '');
    chars[idx] = digit;
    update(chars.join(''));
    if (digit && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !current[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      refs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\s+/g, '').slice(0, length);
    if (pasted) {
      update(pasted);
      refs.current[Math.min(pasted.length, length - 1)]?.focus();
    }
  };

  const row = (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      data-kx="pin-input"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-pin-group', className)}
      style={getSlotStyle('root', style)}
    >
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type={mask ? 'password' : 'text'}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          aria-label={`Digit ${idx + 1} of ${length}`}
          value={current[idx] ?? ''}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          data-slot="cell"
          className={getSlotClass('cell', 'kx-pin-cell')}
        />
      ))}
    </div>
  );

  if (!label && !description && !error) return row;
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
      {row}
    </Field>
  );
}
