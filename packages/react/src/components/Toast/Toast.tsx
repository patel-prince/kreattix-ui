import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useInternalGlyph } from '../Icon/InternalIcons';

export type ToastTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface ToastInput {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  duration?: number;
}

interface ToastRecord extends ToastInput {
  id: string;
}

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let globalToastHandler: ((input: ToastInput) => string) | null = null;

/**
 * Imperative toast helper usable anywhere inside <ToastProvider>.
 */
export function toast(input: ToastInput): string {
  if (!globalToastHandler) {
    return '';
  }
  return globalToastHandler(input);
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: () => '',
      dismiss: () => {},
    };
  }
  return ctx;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  duration?: number;
}

export function ToastProvider({ children, duration = 4000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const closeGlyph = useInternalGlyph('close');

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((input: ToastInput) => {
    const id = `kx-toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...input, id }]);
    return id;
  }, []);

  useEffect(() => {
    globalToastHandler = addToast;
    return () => {
      if (globalToastHandler === addToast) {
        globalToastHandler = null;
      }
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, dismiss }}>
      <ToastPrimitive.Provider duration={duration}>
        {children}
        {toasts.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            duration={item.duration}
            data-kx="toast"
            data-tone={item.tone ?? 'neutral'}
            className="kx-toast-root"
            onOpenChange={(open) => {
              if (!open) dismiss(item.id);
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <ToastPrimitive.Title style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {item.title}
              </ToastPrimitive.Title>
              {item.description && (
                <ToastPrimitive.Description
                  style={{ fontSize: '0.8125rem', color: 'var(--kx-text-muted)', marginTop: '0.2rem' }}
                >
                  {item.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close aria-label="Close notification" className="kx-input-clear">
              {closeGlyph}
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="kx-toast-viewport" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export const Toast = Object.assign(ToastProvider, {
  Provider: ToastPrimitive.Provider,
  Root: ToastPrimitive.Root,
  Title: ToastPrimitive.Title,
  Description: ToastPrimitive.Description,
  Action: ToastPrimitive.Action,
  Close: ToastPrimitive.Close,
  Viewport: ToastPrimitive.Viewport,
});
