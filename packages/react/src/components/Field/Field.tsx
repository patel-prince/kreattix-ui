import React, { forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface FieldControlProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FieldControlProps,
    BaseComponentProps<'root' | 'label' | 'description' | 'error'> {
  htmlFor?: string;
  labelAs?: 'label' | 'span';
  labelId?: string;
  children: React.ReactNode;
}

export function useFieldIds(providedId?: string) {
  const autoId = useId();
  const id = providedId ?? `kx-field-${autoId}`;
  return {
    id,
    descriptionId: `${id}-desc`,
    errorId: `${id}-err`,
  };
}

export function buildAriaDescribedBy(
  hasDescription: boolean,
  hasError: boolean,
  descriptionId: string,
  errorId: string,
  extra?: string
): string | undefined {
  const ids = [
    extra,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Field', rawProps);
  const {
    htmlFor,
    labelAs = 'label',
    labelId,
    label,
    description,
    error,
    required = false,
    className,
    style,
    children,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const { id, descriptionId, errorId } = useFieldIds(htmlFor);

  return (
    <div
      ref={ref}
      data-kx="field"
      data-slot="root"
      data-invalid={Boolean(error) || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-field', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {label &&
        (labelAs === 'span' ? (
          <span
            id={labelId}
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
          </span>
        ) : (
          <LabelPrimitive.Root
            id={labelId}
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
        ))}
      {children}
      {description && !error && (
        <p
          id={descriptionId}
          data-slot="description"
          className={getSlotClass('description', 'kx-field-description')}
          style={getSlotStyle('description')}
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          data-slot="error"
          className={getSlotClass('error', 'kx-field-error')}
          style={getSlotStyle('error')}
        >
          {error}
        </p>
      )}
    </div>
  );
});
