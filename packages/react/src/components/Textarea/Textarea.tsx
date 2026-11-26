import React, { forwardRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import {
  Field,
  buildAriaDescribedBy,
  useFieldIds,
  type FieldControlProps,
} from '../Field/Field';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldControlProps,
    BaseComponentProps<'root' | 'textarea'> {
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Textarea', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    showCount = false,
    maxLength,
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
  const currentVal = String(isControlled ? value : internalVal);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalVal(e.target.value);
    onChange?.(e);
  };

  const control = (
    <>
      <textarea
        ref={ref}
        id={id}
        required={required}
        maxLength={maxLength}
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
        data-kx="textarea"
        data-slot="textarea"
        data-invalid={Boolean(error) || undefined}
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('textarea', 'kx-textarea', className)}
        style={getSlotStyle('textarea', style)}
        {...rest}
      />
      {showCount && (
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--kx-text-muted)',
            alignSelf: 'flex-end',
          }}
        >
          {currentVal.length}
          {maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
    </>
  );

  if (!label && !description && !error && !showCount) {
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
