import React, { forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    FieldControlProps,
    BaseComponentProps<'root' | 'control' | 'thumb' | 'label'> {
  labelPlacement?: 'start' | 'end';
}

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Switch', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    labelPlacement = 'end',
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    'aria-describedby': ariaDescribedByProp,
    ...rest
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(idProp);
  const labelId = `${id}-label`;

  const labelEl = label && (
    <span
      id={labelId}
      data-slot="label"
      className={getSlotClass('label', 'kx-field-label')}
      style={getSlotStyle('label')}
    >
      {label}
    </span>
  );

  return (
    <div
      data-kx="switch"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-field', className)}
      style={getSlotStyle('root', style)}
    >
      <div className={isUnstyled ? undefined : 'kx-switch-row'}>
        {labelPlacement === 'start' && labelEl}
        <SwitchPrimitive.Root
          ref={ref}
          id={id}
          aria-labelledby={label ? labelId : undefined}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={buildAriaDescribedBy(
            Boolean(description && !error),
            Boolean(error),
            descriptionId,
            errorId,
            ariaDescribedByProp
          )}
          data-slot="control"
          className={getSlotClass('control', 'kx-switch')}
          style={getSlotStyle('control')}
          {...rest}
        >
          <SwitchPrimitive.Thumb
            data-slot="thumb"
            className={getSlotClass('thumb', 'kx-switch-thumb')}
            style={getSlotStyle('thumb')}
          />
        </SwitchPrimitive.Root>
        {labelPlacement === 'end' && labelEl}
      </div>
      {description && !error && (
        <p id={descriptionId} className={isUnstyled ? undefined : 'kx-field-description'}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className={isUnstyled ? undefined : 'kx-field-error'}>
          {error}
        </p>
      )}
    </div>
  );
});
