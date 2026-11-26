import {
  createDefaultTokens,
  resolveColorInput,
  tokensToCssVars,
  type DesignTokens,
  type ThemeMode,
} from '@kreattix-ui/tokens';
import type {
  ComponentOverrideConfig,
  KreattixThemeConfig,
  ResolvedKreattixTheme,
} from './types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override?: Record<string, unknown>
): T {
  if (!override) return base;
  const result: Record<string, unknown> = { ...base };
  for (const [key, val] of Object.entries(override)) {
    if (val === undefined) continue;
    const existing = result[key];
    if (isPlainObject(existing) && isPlainObject(val)) {
      result[key] = deepMerge(existing, val);
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

export function mergeThemeConfig(
  base: KreattixThemeConfig,
  override?: KreattixThemeConfig
): KreattixThemeConfig {
  if (!override) return base;
  const mergedComponents: Record<string, ComponentOverrideConfig> = {
    ...(base.components ?? {}),
  };
  if (override.components) {
    for (const [compName, compOverride] of Object.entries(override.components)) {
      const prev = mergedComponents[compName] ?? {};
      mergedComponents[compName] = {
        defaultProps: { ...(prev.defaultProps ?? {}), ...(compOverride.defaultProps ?? {}) },
        slotClasses: { ...(prev.slotClasses ?? {}), ...(compOverride.slotClasses ?? {}) },
        tokens: { ...(prev.tokens ?? {}), ...(compOverride.tokens ?? {}) },
      };
    }
  }

  return {
    ...base,
    ...override,
    colors: { ...(base.colors ?? {}), ...(override.colors ?? {}) },
    icons: { ...(base.icons ?? {}), ...(override.icons ?? {}) },
    tokens: deepMerge(
      (base.tokens ?? {}) as Record<string, unknown>,
      override.tokens as Record<string, unknown> | undefined
    ) as KreattixThemeConfig['tokens'],
    components: mergedComponents,
  };
}

export function resolveTheme(
  config: KreattixThemeConfig = {},
  systemMode: ThemeMode = 'light'
): ResolvedKreattixTheme {
  const modeInput = config.mode ?? 'light';
  const resolvedMode: ThemeMode = modeInput === 'system' ? systemMode : modeInput;
  const density = config.density ?? 'comfortable';
  const radius = config.radius ?? 'md';

  const baseTokens = createDefaultTokens(resolvedMode, density, radius);

  const resolvedColors = {
    primary: config.colors?.primary
      ? resolveColorInput(config.colors.primary)
      : baseTokens.colors.primary,
    neutral: config.colors?.neutral
      ? resolveColorInput(config.colors.neutral)
      : baseTokens.colors.neutral,
    success: config.colors?.success
      ? resolveColorInput(config.colors.success)
      : baseTokens.colors.success,
    warning: config.colors?.warning
      ? resolveColorInput(config.colors.warning)
      : baseTokens.colors.warning,
    danger: config.colors?.danger
      ? resolveColorInput(config.colors.danger)
      : baseTokens.colors.danger,
    info: config.colors?.info
      ? resolveColorInput(config.colors.info)
      : baseTokens.colors.info,
  };

  const mergedTokens: DesignTokens = {
    ...(deepMerge(
      baseTokens as unknown as Record<string, unknown>,
      config.tokens as Record<string, unknown> | undefined
    ) as unknown as DesignTokens),
    mode: resolvedMode,
    density,
    radiusPreset: radius,
    colors: resolvedColors,
  };

  // Sync focus border with resolved primary color if not explicitly overridden
  if (!config.tokens?.border?.focus) {
    mergedTokens.border.focus =
      resolvedMode === 'dark' ? resolvedColors.primary['400'] : resolvedColors.primary['500'];
  }

  const cssVars = tokensToCssVars(mergedTokens);

  // Merge component-level custom token overrides (--kx-comp-<Name>-<token>)
  if (config.components) {
    for (const [compName, compConfig] of Object.entries(config.components)) {
      if (compConfig.tokens) {
        for (const [tokenKey, tokenVal] of Object.entries(compConfig.tokens)) {
          const normalizedKey = tokenKey.startsWith('--')
            ? tokenKey
            : `--kx-${compName.toLowerCase()}-${tokenKey}`;
          cssVars[normalizedKey] = tokenVal;
        }
      }
    }
  }

  return {
    name: config.name ?? 'kreattix-custom',
    mode: modeInput,
    resolvedMode,
    density,
    radius,
    unstyled: config.unstyled ?? false,
    tokens: mergedTokens,
    cssVars,
    icons: config.icons ?? {},
    components: config.components ?? {},
  };
}
