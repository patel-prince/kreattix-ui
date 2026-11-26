import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    BaseComponentProps<'root'> {
  divided?: boolean;
}

const ListRoot = forwardRef<HTMLUListElement, ListProps>(function List(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig('List', rawProps);
  const {
    divided = true,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  return (
    <ul
      ref={ref}
      data-kx="list"
      data-slot="root"
      data-divided={divided || undefined}
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-list', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    />
  );
});

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  leading?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { leading, title, description, trailing, className, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      data-slot="item"
      className={className ? `kx-list-item ${className}` : 'kx-list-item'}
      {...rest}
    >
      {leading && <div className="kx-list-leading">{leading}</div>}
      <div className="kx-list-content">
        <div className="kx-list-title">{title}</div>
        {description && <div className="kx-list-desc">{description}</div>}
      </div>
      {trailing && <div className="kx-list-trailing">{trailing}</div>}
    </li>
  );
});

export const List = Object.assign(ListRoot, {
  Item: ListItem,
});
