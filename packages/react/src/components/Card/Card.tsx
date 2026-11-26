import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export type CardVariant = 'outlined' | 'elevated' | 'subtle';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root' | 'header' | 'body' | 'footer'> {
  variant?: CardVariant;
  interactive?: boolean;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('Card', rawProps);
  const {
    variant = 'outlined',
    interactive = false,
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
      data-kx="card"
      data-slot="root"
      data-variant={variant}
      data-interactive={interactive || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-card', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="header"
        className={className ? `kx-card-header ${className}` : 'kx-card-header'}
        {...rest}
      />
    );
  }
);

const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="body"
        className={className ? `kx-card-body ${className}` : 'kx-card-body'}
        {...rest}
      />
    );
  }
);

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="footer"
        className={className ? `kx-card-footer ${className}` : 'kx-card-footer'}
        {...rest}
      />
    );
  }
);

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
