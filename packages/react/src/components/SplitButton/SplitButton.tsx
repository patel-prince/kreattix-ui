import React, { forwardRef } from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { DropdownMenu, type DropdownMenuItemData } from '../DropdownMenu/DropdownMenu';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface SplitButtonProps extends Omit<ButtonProps, 'rightIcon'> {
  items: DropdownMenuItemData[];
  menuAlign?: 'start' | 'center' | 'end';
}

export const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>(function SplitButton(
  { items, menuAlign = 'end', children, variant = 'solid', tone = 'primary', size = 'md', disabled, ...rest },
  ref
) {
  const chevronGlyph = useInternalGlyph('chevronDown');
  return (
    <ButtonGroup attached>
      <Button ref={ref} variant={variant} tone={tone} size={size} disabled={disabled} {...rest}>
        {children}
      </Button>
      <DropdownMenu
        align={menuAlign}
        items={items}
        trigger={
          <Button
            variant={variant}
            tone={tone}
            size={size}
            disabled={disabled}
            aria-label="More actions"
            style={{ paddingInline: '0.5rem' }}
          >
            {chevronGlyph}
          </Button>
        }
      />
    </ButtonGroup>
  );
});
