import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BaseComponentProps<'root' | 'close'> {
  tone?: TagTone;
  selected?: boolean;
  closable?: boolean;
  onClose?: () => void;
  leftIcon?: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Tag', rawProps);
  const closeGlyph = useInternalGlyph('close');
  const {
    tone = 'neutral',
    selected = false,
    closable = false,
    onClose,
    leftIcon,
    className,
    style,
    children,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <span
      ref={ref}
      data-kx="tag"
      data-slot="root"
      data-tone={tone}
      data-selected={selected || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-tag', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {leftIcon}
      <span>{children}</span>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Remove tag"
          data-slot="close"
          className={getSlotClass('close', 'kx-tag-close')}
        >
          {closeGlyph}
        </button>
      )}
    </span>
  );
});
