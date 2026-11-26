export type ColorStep =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export type ColorScale = Record<ColorStep, string> & {
  foreground: string;
};

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function normalizeHex(hex: string): string {
  const cleaned = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return (
      '#' +
      cleaned
        .split('')
        .map((c) => c + c)
        .join('')
        .toLowerCase()
    );
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return '#' + cleaned.toLowerCase();
  }
  throw new Error(`Invalid hex color: "${hex}"`);
}

export function hexToRgb(hex: string): RGB {
  const normalized = normalizeHex(hex);
  const num = parseInt(normalized.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    case bn:
      h = (rn - gn) / d + 4;
      break;
  }

  return {
    h: (h / 6) * 360,
    s: s * 100,
    l: l * 100,
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = ((h % 360) + 360) % 360 / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;

  if (sn === 0) {
    const val = Math.round(ln * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

/**
 * WCAG 2.1 relative luminance in [0, 1].
 */
export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * WCAG 2.1 contrast ratio between two hex colors in [1, 21].
 */
export function getContrastRatio(hexA: string, hexB: string): number {
  const lumA = getRelativeLuminance(hexA);
  const lumB = getRelativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Returns '#ffffff' or '#09090b' whichever yields higher WCAG contrast.
 */
export function getContrastForeground(backgroundHex: string): string {
  const whiteContrast = getContrastRatio(backgroundHex, '#ffffff');
  const darkContrast = getContrastRatio(backgroundHex, '#09090b');
  return whiteContrast >= darkContrast ? '#ffffff' : '#09090b';
}

const STEP_LIGHTNESS: Record<ColorStep, number> = {
  '50': 97,
  '100': 93,
  '200': 86,
  '300': 76,
  '400': 64,
  '500': 53,
  '600': 45,
  '700': 37,
  '800': 29,
  '900': 21,
  '950': 13,
};

const STEP_SATURATION_FACTOR: Record<ColorStep, number> = {
  '50': 0.92,
  '100': 0.95,
  '200': 0.98,
  '300': 1.0,
  '400': 1.02,
  '500': 1.0,
  '600': 1.03,
  '700': 1.02,
  '800': 0.96,
  '900': 0.9,
  '950': 0.85,
};

/**
 * Generates a perceptually balanced 11-step shade scale (50-950) from any hex color,
 * preserving the input's hue and calculating a contrast-safe foreground for step 600.
 */
export function generateColorScale(baseHex: string): ColorScale {
  const normalized = normalizeHex(baseHex);
  const baseHsl = rgbToHsl(hexToRgb(normalized));
  const isNeutral = baseHsl.s < 8;

  const scale = {} as ColorScale;
  const steps = Object.keys(STEP_LIGHTNESS) as ColorStep[];

  for (const step of steps) {
    const targetL = STEP_LIGHTNESS[step];
    const targetS = isNeutral
      ? baseHsl.s
      : Math.min(98, Math.max(8, baseHsl.s * STEP_SATURATION_FACTOR[step]));
    scale[step] = rgbToHex(hslToRgb({ h: baseHsl.h, s: targetS, l: targetL }));
  }

  scale.foreground = getContrastForeground(scale['600']);
  return scale;
}

export const PALETTES = {
  indigo: {
    '50': '#eef2ff',
    '100': '#e0e7ff',
    '200': '#c7d2fe',
    '300': '#a5b4fc',
    '400': '#818cf8',
    '500': '#6366f1',
    '600': '#4f46e5',
    '700': '#4338ca',
    '800': '#3730a3',
    '900': '#312e81',
    '950': '#1e1b4b',
    foreground: '#ffffff',
  },
  slate: {
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a',
    '950': '#020617',
    foreground: '#ffffff',
  },
  emerald: {
    '50': '#ecfdf5',
    '100': '#d1fae5',
    '200': '#a7f3d0',
    '300': '#6ee7b7',
    '400': '#34d399',
    '500': '#10b981',
    '600': '#059669',
    '700': '#047857',
    '800': '#065f46',
    '900': '#064e3b',
    '950': '#022c22',
    foreground: '#ffffff',
  },
  amber: {
    '50': '#fffbeb',
    '100': '#fef3c7',
    '200': '#fde68a',
    '300': '#fcd34d',
    '400': '#fbbf24',
    '500': '#f59e0b',
    '600': '#d97706',
    '700': '#b45309',
    '800': '#92400e',
    '900': '#78350f',
    '950': '#451a03',
    foreground: '#ffffff',
  },
  rose: {
    '50': '#fff1f2',
    '100': '#ffe4e6',
    '200': '#fecdd3',
    '300': '#fda4af',
    '400': '#fb7185',
    '500': '#f43f5e',
    '600': '#e11d48',
    '700': '#be123c',
    '800': '#9f1239',
    '900': '#881337',
    '950': '#4c0519',
    foreground: '#ffffff',
  },
  sky: {
    '50': '#f0f9ff',
    '100': '#e0f2fe',
    '200': '#bae6fd',
    '300': '#7dd3fc',
    '400': '#38bdf8',
    '500': '#0ea5e9',
    '600': '#0284c7',
    '700': '#0369a1',
    '800': '#075985',
    '900': '#0c4a6e',
    '950': '#082f49',
    foreground: '#ffffff',
  },
  violet: {
    '50': '#f5f3ff',
    '100': '#ede9fe',
    '200': '#ddd6fe',
    '300': '#c4b5fd',
    '400': '#a78bfa',
    '500': '#8b5cf6',
    '600': '#7c3aed',
    '700': '#6d28d9',
    '800': '#5b21b6',
    '900': '#4c1d95',
    '950': '#2e1065',
    foreground: '#ffffff',
  },
  neutral: {
    '50': '#fafafa',
    '100': '#f4f4f5',
    '200': '#e4e4e7',
    '300': '#d4d4d8',
    '400': '#a1a1aa',
    '500': '#71717a',
    '600': '#52525b',
    '700': '#3f3f46',
    '800': '#27272a',
    '900': '#18181b',
    '950': '#09090b',
    foreground: '#ffffff',
  },
} as const satisfies Record<string, ColorScale>;

export type BuiltInPaletteName = keyof typeof PALETTES;
