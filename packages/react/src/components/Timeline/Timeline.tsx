import React, { forwardRef } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

export interface TimelineItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  icon?: React.ReactNode;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    BaseComponentProps<'root' | 'item'> {
  items?: TimelineItemData[];
}

const TimelineRoot = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(rawProps, ref) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'Timeline',
    rawProps
  );
  const {
    items,
    children,
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
      data-kx="timeline"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-timeline', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {items
        ? items.map((item, idx) => (
            <TimelineItem
              key={idx}
              title={item.title}
              description={item.description}
              timestamp={item.timestamp}
              tone={item.tone}
              icon={item.icon}
              unstyled={isUnstyled}
            />
          ))
        : children}
    </ol>
  );
});

export interface TimelineItemProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  icon?: React.ReactNode;
  unstyled?: boolean;
  className?: string;
}

function TimelineItem({
  title,
  description,
  timestamp,
  tone = 'primary',
  icon,
  unstyled,
  className,
}: TimelineItemProps) {
  return (
    <li
      data-slot="item"
      data-tone={tone}
      className={unstyled ? className : className ? `kx-timeline-item ${className}` : 'kx-timeline-item'}
    >
      <span className={unstyled ? undefined : 'kx-timeline-dot'} data-tone={tone}>
        {icon}
      </span>
      <div className={unstyled ? undefined : 'kx-timeline-body'}>
        <div className={unstyled ? undefined : 'kx-timeline-head'}>
          <span className={unstyled ? undefined : 'kx-timeline-title'}>{title}</span>
          {timestamp && <span className={unstyled ? undefined : 'kx-timeline-time'}>{timestamp}</span>}
        </div>
        {description && <div className={unstyled ? undefined : 'kx-timeline-desc'}>{description}</div>}
      </div>
    </li>
  );
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});
