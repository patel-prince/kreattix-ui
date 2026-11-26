import { useContext } from 'react';
import {
  ThemeActionsContext,
  ThemeStateContext,
  type ThemeActions,
} from './ThemeProvider';
import { resolveTheme } from './resolveTheme';
import { kreattixDefault } from './presets';
import type { ResolvedKreattixTheme } from './types';

const FALLBACK_THEME = resolveTheme(kreattixDefault);
const NOOP = () => {};
const FALLBACK_ACTIONS: ThemeActions = {
  setMode: NOOP,
  toggleMode: NOOP,
  setDensity: NOOP,
  setRadius: NOOP,
  setTheme: NOOP,
  updateTheme: NOOP,
};

export function useTheme(): ResolvedKreattixTheme & ThemeActions {
  const state = useContext(ThemeStateContext) ?? FALLBACK_THEME;
  const actions = useContext(ThemeActionsContext) ?? FALLBACK_ACTIONS;
  return {
    ...state,
    ...actions,
  };
}

export function useThemeState(): ResolvedKreattixTheme {
  return useContext(ThemeStateContext) ?? FALLBACK_THEME;
}

export function useThemeActions(): ThemeActions {
  return useContext(ThemeActionsContext) ?? FALLBACK_ACTIONS;
}
