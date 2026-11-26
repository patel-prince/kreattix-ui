import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DensityMode, RadiusPreset, ThemeMode } from '@kreattix-ui/tokens';
import { kreattixDefault } from './presets';
import { mergeThemeConfig, resolveTheme } from './resolveTheme';
import type {
  KreattixThemeConfig,
  ResolvedKreattixTheme,
  ThemeModeInput,
} from './types';

export interface ThemeActions {
  setMode: (mode: ThemeModeInput) => void;
  toggleMode: () => void;
  setDensity: (density: DensityMode) => void;
  setRadius: (radius: RadiusPreset) => void;
  setTheme: (theme: KreattixThemeConfig) => void;
  updateTheme: (partial: KreattixThemeConfig) => void;
}

export const ThemeStateContext = createContext<ResolvedKreattixTheme | null>(null);
export const ThemeActionsContext = createContext<ThemeActions | null>(null);

export interface KreattixProviderProps {
  children: ReactNode;
  /**
   * Theme configuration object or preset. When nested inside another KreattixProvider,
   * merges with the parent theme and scopes CSS variables to a wrapper element.
   */
  theme?: KreattixThemeConfig;
  /**
   * Force scoped wrapper div even at the root level (defaults to false at root, true when nested).
   */
  scoped?: boolean;
  /**
   * Optional storage key for persisting mode ('light' | 'dark' | 'system') in localStorage.
   */
  storageKey?: string;
  /**
   * ClassName applied to the scoped wrapper element when nested or scoped=true.
   */
  className?: string;
}

export function KreattixProvider({
  children,
  theme: initialThemeProp,
  scoped,
  storageKey,
  className,
}: KreattixProviderProps) {
  const parentTheme = useContext(ThemeStateContext);
  const isNested = parentTheme !== null;
  const isScoped = scoped ?? isNested;

  const [systemMode, setSystemMode] = useState<ThemeMode>('light');
  const [themeOverride, setThemeOverride] = useState<KreattixThemeConfig | undefined>(
    initialThemeProp
  );

  // Sync controlled theme prop updates
  useEffect(() => {
    setThemeOverride(initialThemeProp);
  }, [initialThemeProp]);

  // Read persisted mode from localStorage on mount if storageKey is provided
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setThemeOverride((prev) => ({ ...(prev ?? {}), mode: saved }));
      }
    } catch {
      // Ignore storage access errors
    }
  }, [storageKey]);

  // Listen to OS color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemMode(media.matches ? 'dark' : 'light');
    const listener = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const mergedConfig = useMemo<KreattixThemeConfig>(() => {
    if (parentTheme) {
      const parentAsConfig: KreattixThemeConfig = {
        name: parentTheme.name,
        mode: parentTheme.mode,
        density: parentTheme.density,
        radius: parentTheme.radius,
        unstyled: parentTheme.unstyled,
        colors: parentTheme.tokens.colors,
        icons: parentTheme.icons,
        components: parentTheme.components,
      };
      return mergeThemeConfig(parentAsConfig, themeOverride);
    }
    return mergeThemeConfig(kreattixDefault, themeOverride);
  }, [parentTheme, themeOverride]);

  const resolvedTheme = useMemo(
    () => resolveTheme(mergedConfig, systemMode),
    [mergedConfig, systemMode]
  );

  // Apply CSS variables to :root when acting as root provider
  useEffect(() => {
    if (isScoped || typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-kx-theme', resolvedTheme.resolvedMode);
    root.setAttribute('data-kx-density', resolvedTheme.density);
    root.style.colorScheme = resolvedTheme.resolvedMode;

    for (const [key, val] of Object.entries(resolvedTheme.cssVars)) {
      root.style.setProperty(key, val);
    }
  }, [isScoped, resolvedTheme]);

  const persistMode = useCallback(
    (mode: ThemeModeInput) => {
      if (!storageKey || typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(storageKey, mode);
      } catch {
        // Ignore storage errors
      }
    },
    [storageKey]
  );

  const actions = useMemo<ThemeActions>(
    () => ({
      setMode: (mode) => {
        persistMode(mode);
        setThemeOverride((prev) => ({ ...(prev ?? {}), mode }));
      },
      toggleMode: () => {
        const next: ThemeMode = resolvedTheme.resolvedMode === 'dark' ? 'light' : 'dark';
        persistMode(next);
        setThemeOverride((prev) => ({ ...(prev ?? {}), mode: next }));
      },
      setDensity: (density) => {
        setThemeOverride((prev) => ({ ...(prev ?? {}), density }));
      },
      setRadius: (radius) => {
        setThemeOverride((prev) => ({ ...(prev ?? {}), radius }));
      },
      setTheme: (nextTheme) => {
        setThemeOverride(nextTheme);
      },
      updateTheme: (partial) => {
        setThemeOverride((prev) => mergeThemeConfig(prev ?? {}, partial));
      },
    }),
    [persistMode, resolvedTheme.resolvedMode]
  );

  const scopedStyle = useMemo(() => {
    if (!isScoped) return undefined;
    return {
      ...resolvedTheme.cssVars,
      colorScheme: resolvedTheme.resolvedMode,
    } as React.CSSProperties;
  }, [isScoped, resolvedTheme.cssVars, resolvedTheme.resolvedMode]);

  return (
    <ThemeActionsContext.Provider value={actions}>
      <ThemeStateContext.Provider value={resolvedTheme}>
        {isScoped ? (
          <div
            data-kx-theme={resolvedTheme.resolvedMode}
            data-kx-density={resolvedTheme.density}
            data-kx-scoped="true"
            className={className}
            style={scopedStyle}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </ThemeStateContext.Provider>
    </ThemeActionsContext.Provider>
  );
}

export const ThemeProvider = KreattixProvider;

export interface ThemeInitScriptProps {
  storageKey?: string;
  defaultMode?: ThemeModeInput;
}

/**
 * SSR anti-FOUC script for Next.js App Router (<head>).
 * Sets data-kx-theme and colorScheme before React hydration.
 */
export function ThemeInitScript({
  storageKey = 'kx-theme-mode',
  defaultMode = 'light',
}: ThemeInitScriptProps) {
  const script = `
(function() {
  try {
    var mode = localStorage.getItem(${JSON.stringify(storageKey)}) || ${JSON.stringify(defaultMode)};
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var root = document.documentElement;
    root.setAttribute('data-kx-theme', mode);
    root.style.colorScheme = mode;
  } catch (e) {}
})();
`.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
