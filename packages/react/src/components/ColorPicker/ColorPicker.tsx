import React, { useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';

const DEFAULT_SWATCHES = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#e11d48', '#8b5cf6', '#18181b'];

export interface ColorPickerProps
  extends FieldControlProps,
    BaseComponentProps<'root' | 'swatch'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (hex: string) => void;
  swatches?: string[];
  id?: string;
  className?: string;
}

export function ColorPicker(rawProps: ColorPickerProps) {
  const { props, isUnstyled, getSlotClass } = useComponentConfig('ColorPicker', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    value,
    defaultValue = '#4f46e5',
    onValueChange,
    swatches = DEFAULT_SWATCHES,
    className,
  } = props;

  const { id } = useFieldIds(idProp);
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const commit = (hex: string) => {
    if (value === undefined) setInternal(hex);
    onValueChange?.(hex);
  };

  const control = (
    <div
      data-kx="color-picker"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-color-picker', className)}
    >
      <div className="kx-color-swatches">
        {swatches.map((hex) => (
          <button
            key={hex}
            type="button"
            aria-label={`Color ${hex}`}
            data-selected={current.toLowerCase() === hex.toLowerCase() || undefined}
            onClick={() => commit(hex)}
            data-slot="swatch"
            className={getSlotClass('swatch', 'kx-color-swatch')}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
      <div className="kx-input-wrap" data-size="sm">
        <span
          style={{
            width: '1rem',
            height: '1rem',
            borderRadius: 'var(--kx-radius-sm)',
            backgroundColor: current,
            border: '1px solid var(--kx-border-default)',
            flexShrink: 0,
          }}
        />
        <input
          id={id}
          type="text"
          value={current}
          onChange={(e) => commit(e.target.value)}
          className="kx-input"
          aria-label="Hex color value"
        />
      </div>
    </div>
  );

  if (!label && !description && !error) return control;
  return (
    <Field htmlFor={id} label={label} description={description} error={error} required={required} unstyled={isUnstyled}>
      {control}
    </Field>
  );
}
