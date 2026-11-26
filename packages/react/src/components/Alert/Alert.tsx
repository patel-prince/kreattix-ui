import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    BaseComponentProps<'root' | 'icon' | 'title' | 'description' | 'close'> {
  tone?: AlertTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Alert', rawProps);
  const infoGlyph = useInternalGlyph('info');
  const successGlyph = useInternalGlyph('success');
  const warningGlyph = useInternalGlyph('warning');
  const dangerGlyph = useInternalGlyph('danger');
  const closeGlyph = useInternalGlyph('close');

  const {
    tone = 'info',
    title,
    description,
    icon,
    dismissible = false,
    onDismiss,
    action,
    children,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const defaultGlyph =
    tone === 'success'
      ? successGlyph
      : tone === 'warning'
        ? warningGlyph
        : tone === 'danger'
          ? dangerGlyph
          : infoGlyph;

  return (
    <div
      ref={ref}
      role="alert"
      data-kx="alert"
      data-slot="root"
      data-tone={tone}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-alert', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      <span
        data-slot="icon"
        className={getSlotClass('icon', 'kx-icon')}
        style={getSlotStyle('icon', { marginTop: '0.1rem' })}
        aria-hidden="true"
      >
        {icon ?? defaultGlyph}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p
            data-slot="title"
            className={getSlotClass('title', 'kx-alert-title')}
            style={getSlotStyle('title')}
          >
            {title}
          </p>
        )}
        {(description || children) && (
          <div
            data-slot="description"
            className={getSlotClass('description', 'kx-alert-description')}
            style={getSlotStyle('description')}
          >
            {description ?? children}
          </div>
        )}
      </div>
      {action}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          data-slot="close"
          className={getSlotClass('close', 'kx-input-clear')}
          style={getSlotStyle('close')}
        >
          {closeGlyph}
        </button>
      )}
    </div>
  );
});
