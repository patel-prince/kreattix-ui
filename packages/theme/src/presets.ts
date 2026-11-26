import { PALETTES } from '@kreattix-ui/tokens';
import type { KreattixThemeConfig } from './types';

export const kreattixDefault: KreattixThemeConfig = {
  name: 'kreattix-default',
  mode: 'light',
  density: 'comfortable',
  radius: 'md',
  colors: {
    primary: PALETTES.indigo,
    neutral: PALETTES.neutral,
    success: PALETTES.emerald,
    warning: PALETTES.amber,
    danger: PALETTES.rose,
    info: PALETTES.sky,
  },
};

export const midnight: KreattixThemeConfig = {
  name: 'midnight',
  mode: 'dark',
  density: 'comfortable',
  radius: 'lg',
  colors: {
    primary: PALETTES.violet,
    neutral: PALETTES.slate,
    success: PALETTES.emerald,
    warning: PALETTES.amber,
    danger: PALETTES.rose,
    info: PALETTES.sky,
  },
};

export const minimal: KreattixThemeConfig = {
  name: 'minimal',
  mode: 'light',
  density: 'compact',
  radius: 'sm',
  colors: {
    primary: '#18181b',
    neutral: PALETTES.neutral,
    success: PALETTES.emerald,
    warning: PALETTES.amber,
    danger: PALETTES.rose,
    info: PALETTES.sky,
  },
};

export const enterprise: KreattixThemeConfig = {
  name: 'enterprise',
  mode: 'light',
  density: 'compact',
  radius: 'sm',
  colors: {
    primary: PALETTES.sky,
    neutral: PALETTES.slate,
    success: PALETTES.emerald,
    warning: PALETTES.amber,
    danger: PALETTES.rose,
    info: PALETTES.indigo,
  },
};

export const vibrant: KreattixThemeConfig = {
  name: 'vibrant',
  mode: 'light',
  density: 'spacious',
  radius: 'full',
  colors: {
    primary: PALETTES.rose,
    neutral: PALETTES.neutral,
    success: PALETTES.emerald,
    warning: PALETTES.amber,
    danger: '#dc2626',
    info: PALETTES.violet,
  },
};

export const THEME_PRESETS = {
  kreattixDefault,
  midnight,
  minimal,
  enterprise,
  vibrant,
} as const;

export type ThemePresetName = keyof typeof THEME_PRESETS;
