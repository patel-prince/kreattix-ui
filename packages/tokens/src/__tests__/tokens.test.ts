import { describe, expect, it } from 'vitest';
import {
  PALETTES,
  createDefaultTokens,
  generateColorScale,
  getContrastRatio,
  normalizeHex,
  tokensToCssVars,
} from '../index';

describe('@kreattix-ui/tokens', () => {
  it('normalizes 3-digit and 6-digit hex colors', () => {
    expect(normalizeHex('#F0A')).toBe('#ff00aa');
    expect(normalizeHex('6366F1')).toBe('#6366f1');
    expect(() => normalizeHex('not-a-color')).toThrow();
  });

  it('generates an 11-step color scale with WCAG contrast-safe foreground', () => {
    const scale = generateColorScale('#4f46e5');
    expect(Object.keys(scale)).toEqual([
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
      'foreground',
    ]);
    expect(getContrastRatio(scale['600'], scale.foreground)).toBeGreaterThanOrEqual(4.5);
  });

  it('picks dark foreground for bright yellow scales', () => {
    const yellowScale = generateColorScale('#facc15');
    expect(yellowScale.foreground).toBe('#09090b');
    const brightContrast = getContrastRatio(yellowScale['600'], yellowScale.foreground);
    expect(brightContrast).toBeGreaterThanOrEqual(4.5);
  });

  it('creates light and dark default tokens and emits --kx-* CSS variables', () => {
    const light = createDefaultTokens('light', 'compact', 'lg');
    const dark = createDefaultTokens('dark', 'spacious', 'none');

    expect(light.bg.canvas).toBe('#ffffff');
    expect(dark.bg.canvas).toBe('#09090b');

    const lightVars = tokensToCssVars(light);
    expect(lightVars['--kx-primary-600']).toBe(PALETTES.indigo['600']);
    expect(lightVars['--kx-density-scale']).toBe('0.85');
    expect(lightVars['--kx-radius-md']).toBe('12px');

    const darkVars = tokensToCssVars(dark);
    expect(darkVars['--kx-density-scale']).toBe('1.18');
    expect(darkVars['--kx-radius-md']).toBe('0px');
  });
});
