import { PALETTES, generateColorScale, type ColorScale, type ColorStep } from './colors';

export type ThemeMode = 'light' | 'dark';
export type DensityMode = 'compact' | 'comfortable' | 'spacious';
export type RadiusPreset = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface SemanticSurfaceTokens {
  canvas: string;
  surface: string;
  elevated: string;
  subtle: string;
  muted: string;
}

export interface SemanticTextTokens {
  primary: string;
  secondary: string;
  muted: string;
  inverse: string;
}

export interface SemanticBorderTokens {
  default: string;
  subtle: string;
  strong: string;
  focus: string;
}

export interface TypographyTokens {
  fontSans: string;
  fontMono: string;
  sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface SpacingTokens {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
  '16': string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface MotionTokens {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easeSmooth: string;
  easeSpring: string;
}

export interface ZIndexTokens {
  dropdown: string;
  sticky: string;
  overlay: string;
  modal: string;
  popover: string;
  toast: string;
  tooltip: string;
}

export interface DesignTokens {
  mode: ThemeMode;
  density: DensityMode;
  radiusPreset: RadiusPreset;
  colors: {
    primary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
    info: ColorScale;
  };
  bg: SemanticSurfaceTokens;
  text: SemanticTextTokens;
  border: SemanticBorderTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radii: RadiusTokens;
  shadows: ShadowTokens;
  motion: MotionTokens;
  zIndex: ZIndexTokens;
}

export const DENSITY_SCALE: Record<DensityMode, number> = {
  compact: 0.85,
  comfortable: 1,
  spacious: 1.18,
};

export const RADIUS_PRESETS: Record<RadiusPreset, { sm: string; md: string; lg: string; xl: string }> = {
  none: { sm: '0px', md: '0px', lg: '0px', xl: '0px' },
  sm: { sm: '2px', md: '4px', lg: '6px', xl: '8px' },
  md: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
  lg: { sm: '6px', md: '12px', lg: '16px', xl: '24px' },
  full: { sm: '8px', md: '9999px', lg: '9999px', xl: '9999px' },
};

export const BASE_TYPOGRAPHY: TypographyTokens = {
  fontSans:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  fontMono:
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.65',
  },
};

export const BASE_SPACING: SpacingTokens = {
  '0': '0px',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
};

export const BASE_MOTION: MotionTokens = {
  durationFast: '120ms',
  durationNormal: '200ms',
  durationSlow: '320ms',
  easeSmooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const BASE_Z_INDEX: ZIndexTokens = {
  dropdown: '1000',
  sticky: '1100',
  overlay: '1200',
  modal: '1300',
  popover: '1400',
  toast: '1500',
  tooltip: '1600',
};

export function resolveColorInput(input: string | ColorScale): ColorScale {
  return typeof input === 'string' ? generateColorScale(input) : input;
}

export function createDefaultTokens(
  mode: ThemeMode = 'light',
  density: DensityMode = 'comfortable',
  radiusPreset: RadiusPreset = 'md'
): DesignTokens {
  const isDark = mode === 'dark';
  const neutral = PALETTES.neutral;
  const primary = PALETTES.indigo;
  const radiusValues = RADIUS_PRESETS[radiusPreset];

  return {
    mode,
    density,
    radiusPreset,
    colors: {
      primary,
      neutral,
      success: PALETTES.emerald,
      warning: PALETTES.amber,
      danger: PALETTES.rose,
      info: PALETTES.sky,
    },
    bg: isDark
      ? {
          canvas: '#09090b',
          surface: '#111114',
          elevated: '#18181c',
          subtle: '#1f1f24',
          muted: '#27272a',
        }
      : {
          canvas: '#ffffff',
          surface: '#ffffff',
          elevated: '#ffffff',
          subtle: '#f4f4f5',
          muted: '#e4e4e7',
        },
    text: isDark
      ? {
          primary: '#fafafa',
          secondary: '#d4d4d8',
          muted: '#a1a1aa',
          inverse: '#09090b',
        }
      : {
          primary: '#09090b',
          secondary: '#3f3f46',
          muted: '#71717a',
          inverse: '#ffffff',
        },
    border: isDark
      ? {
          default: '#27272a',
          subtle: '#1f1f24',
          strong: '#3f3f46',
          focus: primary['400'],
        }
      : {
          default: '#e4e4e7',
          subtle: '#f4f4f5',
          strong: '#d4d4d8',
          focus: primary['500'],
        },
    typography: BASE_TYPOGRAPHY,
    spacing: BASE_SPACING,
    radii: {
      none: '0px',
      sm: radiusValues.sm,
      md: radiusValues.md,
      lg: radiusValues.lg,
      xl: radiusValues.xl,
      full: '9999px',
    },
    shadows: isDark
      ? {
          xs: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
          sm: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
          md: '0 4px 10px -1px rgb(0 0 0 / 0.55), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
          lg: '0 10px 24px -3px rgb(0 0 0 / 0.65), 0 4px 8px -4px rgb(0 0 0 / 0.6)',
          xl: '0 20px 40px -6px rgb(0 0 0 / 0.75)',
        }
      : {
          xs: '0 1px 2px 0 rgb(9 9 11 / 0.04)',
          sm: '0 1px 3px 0 rgb(9 9 11 / 0.08), 0 1px 2px -1px rgb(9 9 11 / 0.06)',
          md: '0 4px 12px -2px rgb(9 9 11 / 0.08), 0 2px 4px -2px rgb(9 9 11 / 0.05)',
          lg: '0 12px 24px -4px rgb(9 9 11 / 0.1), 0 4px 8px -4px rgb(9 9 11 / 0.06)',
          xl: '0 20px 40px -8px rgb(9 9 11 / 0.14)',
        },
    motion: BASE_MOTION,
    zIndex: BASE_Z_INDEX,
  };
}

const COLOR_STEPS: ColorStep[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
];

/**
 * Flattens a resolved DesignTokens object into --kx-* CSS Custom Properties.
 */
export function tokensToCssVars(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Color scales
  for (const [role, scale] of Object.entries(tokens.colors)) {
    for (const step of COLOR_STEPS) {
      vars[`--kx-${role}-${step}`] = scale[step];
    }
    vars[`--kx-${role}-foreground`] = scale.foreground;
  }

  // Surfaces
  vars['--kx-bg-canvas'] = tokens.bg.canvas;
  vars['--kx-bg-surface'] = tokens.bg.surface;
  vars['--kx-bg-elevated'] = tokens.bg.elevated;
  vars['--kx-bg-subtle'] = tokens.bg.subtle;
  vars['--kx-bg-muted'] = tokens.bg.muted;

  // Text
  vars['--kx-text-primary'] = tokens.text.primary;
  vars['--kx-text-secondary'] = tokens.text.secondary;
  vars['--kx-text-muted'] = tokens.text.muted;
  vars['--kx-text-inverse'] = tokens.text.inverse;

  // Borders
  vars['--kx-border-default'] = tokens.border.default;
  vars['--kx-border-subtle'] = tokens.border.subtle;
  vars['--kx-border-strong'] = tokens.border.strong;
  vars['--kx-border-focus'] = tokens.border.focus;

  // Typography
  vars['--kx-font-sans'] = tokens.typography.fontSans;
  vars['--kx-font-mono'] = tokens.typography.fontMono;
  for (const [key, val] of Object.entries(tokens.typography.sizes)) {
    vars[`--kx-text-${key}`] = val;
  }
  for (const [key, val] of Object.entries(tokens.typography.lineHeights)) {
    vars[`--kx-leading-${key}`] = val;
  }

  // Spacing & Density
  vars['--kx-density-scale'] = String(DENSITY_SCALE[tokens.density]);
  for (const [key, val] of Object.entries(tokens.spacing)) {
    vars[`--kx-space-${key}`] = val;
  }

  // Radii
  for (const [key, val] of Object.entries(tokens.radii)) {
    vars[`--kx-radius-${key}`] = val;
  }

  // Shadows
  for (const [key, val] of Object.entries(tokens.shadows)) {
    vars[`--kx-shadow-${key}`] = val;
  }

  // Motion
  vars['--kx-duration-fast'] = tokens.motion.durationFast;
  vars['--kx-duration-normal'] = tokens.motion.durationNormal;
  vars['--kx-duration-slow'] = tokens.motion.durationSlow;
  vars['--kx-ease-smooth'] = tokens.motion.easeSmooth;
  vars['--kx-ease-spring'] = tokens.motion.easeSpring;

  // Z-index
  for (const [key, val] of Object.entries(tokens.zIndex)) {
    vars[`--kx-z-${key}`] = val;
  }

  return vars;
}
