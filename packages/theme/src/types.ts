import type { ReactNode } from 'react';
import type {
  ColorScale,
  DensityMode,
  DesignTokens,
  RadiusPreset,
  ThemeMode,
} from '@kreattix-ui/tokens';

export type ThemeModeInput = ThemeMode | 'system';

export type ThemeColorInput = string | ColorScale;

export interface ThemeColorsConfig {
  primary?: ThemeColorInput;
  neutral?: ThemeColorInput;
  success?: ThemeColorInput;
  warning?: ThemeColorInput;
  danger?: ThemeColorInput;
  info?: ThemeColorInput;
}

export interface ThemeIconsConfig {
  chevronDown?: ReactNode;
  chevronRight?: ReactNode;
  chevronUp?: ReactNode;
  close?: ReactNode;
  check?: ReactNode;
  minus?: ReactNode;
  spinner?: ReactNode;
  info?: ReactNode;
  success?: ReactNode;
  warning?: ReactNode;
  danger?: ReactNode;
}

export interface ComponentOverrideConfig<
  TProps extends Record<string, unknown> = Record<string, unknown>,
> {
  defaultProps?: Partial<TProps>;
  slotClasses?: Record<string, string>;
  tokens?: Record<string, string>;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface KreattixThemeConfig {
  name?: string;
  mode?: ThemeModeInput;
  density?: DensityMode;
  radius?: RadiusPreset;
  unstyled?: boolean;
  colors?: ThemeColorsConfig;
  tokens?: DeepPartial<Omit<DesignTokens, 'mode' | 'density' | 'radiusPreset' | 'colors'>>;
  icons?: ThemeIconsConfig;
  components?: Record<string, ComponentOverrideConfig>;
}

export interface ResolvedKreattixTheme {
  name: string;
  mode: ThemeModeInput;
  resolvedMode: ThemeMode;
  density: DensityMode;
  radius: RadiusPreset;
  unstyled: boolean;
  tokens: DesignTokens;
  cssVars: Record<string, string>;
  icons: ThemeIconsConfig;
  components: Record<string, ComponentOverrideConfig>;
}
