import { resolveTheme } from './resolveTheme';
import type { KreattixThemeConfig } from './types';

export interface GenerateThemeCssOptions {
  selector?: string;
  includeColorScheme?: boolean;
}

/**
 * Generates a static CSS string of --kx-* CSS Custom Properties for SSR / zero-JS theming.
 */
export function generateThemeCss(
  config: KreattixThemeConfig = {},
  options: GenerateThemeCssOptions = {}
): string {
  const { selector = ':root', includeColorScheme = true } = options;
  const resolved = resolveTheme(config);
  const lines = Object.entries(resolved.cssVars).map(([key, value]) => `  ${key}: ${value};`);
  if (includeColorScheme) {
    lines.unshift(`  color-scheme: ${resolved.resolvedMode};`);
  }
  return `${selector} {\n${lines.join('\n')}\n}`;
}
