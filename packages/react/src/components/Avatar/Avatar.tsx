import React, { forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    BaseComponentProps<'root' | 'image' | 'fallback' | 'status'> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  fallback?: React.ReactNode;
}

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Avatar', rawProps);
  const {
    src,
    alt,
    name,
    size = 'md',
    status,
    fallback,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-kx="avatar"
      data-slot="root"
      data-size={size}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-avatar', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          data-slot="image"
          className={getSlotClass('image', 'kx-avatar-img')}
          style={getSlotStyle('image')}
        />
      )}
      <AvatarPrimitive.Fallback
        delayMs={src ? 300 : 0}
        data-slot="fallback"
        className={getSlotClass('fallback', 'kx-avatar-fallback')}
        style={getSlotStyle('fallback')}
      >
        {fallback ?? getInitials(name)}
      </AvatarPrimitive.Fallback>
      {status && (
        <span
          data-slot="status"
          data-status={status}
          className={getSlotClass('status', 'kx-avatar-status')}
          style={getSlotStyle('status')}
          aria-label={status}
        />
      )}
    </AvatarPrimitive.Root>
  );
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, children, className, ...rest },
  ref
) {
  const items = React.Children.toArray(children);
  const visible = max !== undefined ? items.slice(0, max) : items;
  const overflow = max !== undefined && items.length > max ? items.length - max : 0;

  return (
    <div
      ref={ref}
      data-kx="avatar-group"
      className={className ? `kx-avatar-group ${className}` : 'kx-avatar-group'}
      {...rest}
    >
      {visible}
      {overflow > 0 && <Avatar fallback={`+${overflow}`} size="md" />}
    </div>
  );
});
