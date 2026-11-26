import React, { forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    FieldControlProps,
    BaseComponentProps<'root' | 'track' | 'range' | 'thumb'> {
  showValue?: boolean;
}

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Slider', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    showValue = false,
    value,
    defaultValue = [50],
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;
  const values = value ?? defaultValue;

  const slider = (
    <SliderPrimitive.Root
      ref={ref}
      id={id}
      aria-labelledby={label ? labelId : undefined}
      value={value}
      defaultValue={defaultValue}
      data-kx="slider"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-slider', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <SliderPrimitive.Track
        data-slot="track"
        className={getSlotClass('track', 'kx-slider-track')}
        style={getSlotStyle('track')}
      >
        <SliderPrimitive.Range
          data-slot="range"
          className={getSlotClass('range', 'kx-slider-range')}
          style={getSlotStyle('range')}
        />
      </SliderPrimitive.Track>
      {values.map((_, idx) => (
        <SliderPrimitive.Thumb
          key={idx}
          data-slot="thumb"
          className={getSlotClass('thumb', 'kx-slider-thumb')}
          style={getSlotStyle('thumb')}
          aria-label={typeof label === 'string' ? label : `Slider thumb ${idx + 1}`}
        />
      ))}
    </SliderPrimitive.Root>
  );

  if (!label && !description && !error && !showValue) return slider;

  return (
    <Field
      htmlFor={id}
      labelAs="span"
      labelId={labelId}
      label={
        showValue && label ? (
          <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>{label}</span>
            <span style={{ color: 'var(--kx-text-muted)', fontWeight: 400 }}>
              {values.join(' – ')}
            </span>
          </span>
        ) : (
          label
        )
      }
      description={description}
      error={error}
      required={required}
      unstyled={isUnstyled}
    >
      {slider}
    </Field>
  );
});
