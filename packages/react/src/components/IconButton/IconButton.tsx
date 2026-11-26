import React, { forwardRef } from 'react';
import { Button, type ButtonProps } from '../Button/Button';

export interface IconButtonProps
  extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loadingText' | 'fullWidth'> {
  /**
   * Required accessible label for icon-only buttons.
   */
  'aria-label': string;
  icon?: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, children, ...rest },
  ref
) {
  return (
    <Button ref={ref} data-icon-only="true" {...rest}>
      {icon ?? children}
    </Button>
  );
});
