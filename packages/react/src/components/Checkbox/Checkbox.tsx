import React, { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    FieldControlProps,
    BaseComponentProps<'root' | 'control' | 'indicator' | 'label'> {}

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Checkbox', rawProps);
  const checkGlyph = useInternalGlyph('check');
  const minusGlyph = useInternalGlyph('minus');

  const {
    id: idProp,
    label,
    description,
    error,
    required,
    checked,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    'aria-describedby': ariaDescribedByProp,
    ...rest
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(idProp);

  return (
    <div
      data-kx="checkbox"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-field', className)}
      style={getSlotStyle('root', style)}
    >
      <div className={isUnstyled ? undefined : 'kx-checkbox-row'}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          checked={checked}
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
          className={getSlotClass('control', 'kx-checkbox')}
          style={getSlotStyle('control')}
          {...rest}
        >
          <CheckboxPrimitive.Indicator
            data-slot="indicator"
            className={getSlotClass('indicator', 'kx-icon')}
            style={getSlotStyle('indicator')}
          >
            {checked === 'indeterminate' ? minusGlyph : checkGlyph}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {(label || description) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            {label && (
              <LabelPrimitive.Root
                htmlFor={id}
                data-slot="label"
                className={getSlotClass('label', 'kx-field-label')}
                style={getSlotStyle('label')}
              >
                {label}
                {required && (
                  <span className={isUnstyled ? undefined : 'kx-field-required'} aria-hidden="true">
                    *
                  </span>
                )}
              </LabelPrimitive.Root>
            )}
            {description && !error && (
              <p id={descriptionId} className={isUnstyled ? undefined : 'kx-field-description'}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className={isUnstyled ? undefined : 'kx-field-error'}>
          {error}
        </p>
      )}
    </div>
  );
});
