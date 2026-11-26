import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    BaseComponentProps<'root' | 'icon' | 'title' | 'description' | 'actions'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'EmptyState',
    rawProps
  );
  const {
    icon,
    title,
    description,
    action,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      data-kx="empty-state"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-empty-state', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {icon && (
        <div
          data-slot="icon"
          className={getSlotClass('icon', 'kx-empty-icon')}
          style={getSlotStyle('icon')}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3
        data-slot="title"
        className={getSlotClass('title', 'kx-empty-title')}
        style={getSlotStyle('title')}
      >
        {title}
      </h3>
      {description && (
        <p
          data-slot="description"
          className={getSlotClass('description', 'kx-empty-desc')}
          style={getSlotStyle('description')}
        >
          {description}
        </p>
      )}
      {action && (
        <div
          data-slot="actions"
          className={getSlotClass('actions', 'kx-empty-actions')}
          style={getSlotStyle('actions')}
        >
          {action}
        </div>
      )}
    </div>
  );
});
