import type { CSSProperties } from 'react';
import { useThemeState } from '@kreattix-ui/theme';
import { cn } from './cn';

export type SlotClassNames<TSlots extends string> = Partial<Record<TSlots, string>>;
export type SlotStyles<TSlots extends string> = Partial<Record<TSlots, CSSProperties>>;

export interface BaseComponentProps<TSlots extends string = 'root'> {
  /**
   * Strip Kreattix visual classes while preserving structure, Radix behavior, and accessibility.
   */
  unstyled?: boolean;
  /**
   * Per-slot className overrides.
   */
  classNames?: SlotClassNames<TSlots>;
  /**
   * Per-slot inline style overrides.
   */
  styles?: SlotStyles<TSlots>;
}

export type InferSlots<TProps> = TProps extends BaseComponentProps<infer S> ? S : 'root';

/**
 * Merges ThemeProvider component defaultProps, global unstyled, slotClasses,
 * and per-instance props in one predictable pass.
 */
export function useComponentConfig<
  TProps extends object,
  TSlots extends string = InferSlots<TProps>,
>(componentName: string, props: TProps) {
  const theme = useThemeState();
  const override = theme.components[componentName];
  const mergedProps = {
    ...(override?.defaultProps ?? {}),
    ...props,
  } as TProps & BaseComponentProps<TSlots>;

  const isUnstyled = Boolean(mergedProps.unstyled ?? theme.unstyled);
  const themeSlotClasses = (override?.slotClasses ?? {}) as SlotClassNames<TSlots>;
  const propSlotClasses = (mergedProps.classNames ?? {}) as SlotClassNames<TSlots>;
  const propSlotStyles = (mergedProps.styles ?? {}) as SlotStyles<TSlots>;

  const getSlotClass = (slot: TSlots, defaultClass: string, extraClass?: string) =>
    cn(
      !isUnstyled && defaultClass,
      themeSlotClasses[slot],
      propSlotClasses[slot],
      extraClass
    );

  const getSlotStyle = (slot: TSlots, extraStyle?: CSSProperties): CSSProperties | undefined => {
    const slotStyle = propSlotStyles[slot];
    if (!slotStyle && !extraStyle) return undefined;
    return { ...(slotStyle ?? {}), ...(extraStyle ?? {}) };
  };

  return {
    props: mergedProps,
    isUnstyled,
    theme,
    getSlotClass,
    getSlotStyle,
  };
}
