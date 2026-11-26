import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
export type ButtonTone = 'primary' | 'neutral' | 'success' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseComponentProps<'root' | 'leftIcon' | 'rightIcon' | 'spinner'> {
  asChild?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Button', rawProps);
  const spinnerGlyph = useInternalGlyph('spinner');

  const {
    asChild = false,
    variant = 'solid',
    tone = 'primary',
    size = 'md',
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled = false,
    type = 'button',
    className,
    style,
    children,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const isDisabled = disabled || loading;
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      data-kx="button"
      data-slot="root"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-loading={loading || undefined}
      data-disabled={isDisabled || undefined}
      data-full-width={fullWidth || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-btn', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <span
              data-slot="spinner"
              className={getSlotClass('spinner', 'kx-icon')}
              style={getSlotStyle('spinner')}
              aria-hidden="true"
            >
              {spinnerGlyph}
            </span>
          ) : (
            leftIcon && (
              <span
                data-slot="leftIcon"
                className={getSlotClass('leftIcon', 'kx-icon')}
                style={getSlotStyle('leftIcon')}
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )
          )}
          {loading && loadingText ? loadingText : children}
          {!loading && rightIcon && (
            <span
              data-slot="rightIcon"
              className={getSlotClass('rightIcon', 'kx-icon')}
              style={getSlotStyle('rightIcon')}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </Comp>
  );
});
