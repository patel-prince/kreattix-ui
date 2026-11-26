import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface StepItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLOListElement>,
    BaseComponentProps<'root' | 'step'> {
  steps: StepItemData[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (index: number) => void;
}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Stepper',
    rawProps
  );
  const checkGlyph = useInternalGlyph('check');
  const {
    steps,
    activeStep,
    orientation = 'horizontal',
    onStepClick,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <ol
      ref={ref}
      data-kx="stepper"
      data-slot="root"
      data-orientation={orientation}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-stepper', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {steps.map((step, idx) => {
        const status = idx < activeStep ? 'complete' : idx === activeStep ? 'current' : 'upcoming';
        return (
          <li
            key={idx}
            data-slot="step"
            data-status={status}
            aria-current={status === 'current' ? 'step' : undefined}
            className={getSlotClass('step', 'kx-step')}
          >
            <button
              type="button"
              disabled={!onStepClick}
              onClick={() => onStepClick?.(idx)}
              className={isUnstyled ? undefined : 'kx-step-btn'}
            >
              <span className={isUnstyled ? undefined : 'kx-step-circle'} data-status={status}>
                {status === 'complete' ? checkGlyph : idx + 1}
              </span>
              <span className={isUnstyled ? undefined : 'kx-step-text'}>
                <span className={isUnstyled ? undefined : 'kx-step-title'}>{step.title}</span>
                {step.description && (
                  <span className={isUnstyled ? undefined : 'kx-step-desc'}>{step.description}</span>
                )}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <span className={isUnstyled ? undefined : 'kx-step-connector'} data-complete={idx < activeStep || undefined} />
            )}
          </li>
        );
      })}
    </ol>
  );
});
