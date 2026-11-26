import React, { createContext, useContext, useRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';

interface ResizableContextValue {
  direction: 'horizontal' | 'vertical';
  ratio: number;
  setRatio: (r: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ResizableContext = createContext<ResizableContextValue | null>(null);

export interface ResizablePanelsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root'> {
  direction?: 'horizontal' | 'vertical';
  defaultRatio?: number;
  minRatio?: number;
  maxRatio?: number;
}

function ResizablePanelsRoot(rawProps: ResizablePanelsProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'ResizablePanels',
    rawProps
  );
  const {
    direction = 'horizontal',
    defaultRatio = 50,
    className,
    style,
    children,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const [ratio, setRatio] = useState(defaultRatio);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ResizableContext.Provider value={{ direction, ratio, setRatio, containerRef }}>
      <div
        ref={containerRef}
        data-kx="resizable-panels"
        data-slot="root"
        data-direction={direction}
        data-unstyled={isUnstyled || undefined}
        className={getSlotClass('root', 'kx-resizable', className)}
        style={getSlotStyle('root', {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          ...(style ?? {}),
        })}
        {...rest}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: 0 | 1;
}

function ResizablePanel({ index = 0, style, className, ...rest }: ResizablePanelProps) {
  const ctx = useContext(ResizableContext);
  const size = ctx ? (index === 0 ? `${ctx.ratio}%` : `${100 - ctx.ratio}%`) : '50%';
  return (
    <div
      data-slot="panel"
      className={className ? `kx-resizable-panel ${className}` : 'kx-resizable-panel'}
      style={{ flexBasis: size, flexGrow: 0, flexShrink: 0, overflow: 'auto', ...(style ?? {}) }}
      {...rest}
    />
  );
}

function ResizableHandle({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = useContext(ResizableContext);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ctx?.containerRef.current) return;
    e.preventDefault();
    const rect = ctx.containerRef.current.getBoundingClientRect();
    const onMove = (ev: PointerEvent) => {
      const pct =
        ctx.direction === 'horizontal'
          ? ((ev.clientX - rect.left) / rect.width) * 100
          : ((ev.clientY - rect.top) / rect.height) * 100;
      ctx.setRatio(Math.max(15, Math.min(85, pct)));
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!ctx) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      ctx.setRatio(Math.max(15, ctx.ratio - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      ctx.setRatio(Math.min(85, ctx.ratio + 5));
    }
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={ctx?.direction === 'horizontal' ? 'vertical' : 'horizontal'}
      aria-valuenow={Math.round(ctx?.ratio ?? 50)}
      aria-valuemin={15}
      aria-valuemax={85}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      data-slot="handle"
      className={className ? `kx-resizable-handle ${className}` : 'kx-resizable-handle'}
      {...rest}
    />
  );
}

export const ResizablePanels = Object.assign(ResizablePanelsRoot, {
  Panel: ResizablePanel,
  Handle: ResizableHandle,
});
