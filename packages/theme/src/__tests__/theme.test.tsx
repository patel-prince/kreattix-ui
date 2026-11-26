import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import {
  KreattixProvider,
  generateThemeCss,
  midnight,
  useTheme,
} from '../index';

function ThemeProbe() {
  const { resolvedMode, density, radius, toggleMode, setDensity, components } = useTheme();
  return (
    <div>
      <span data-testid="mode">{resolvedMode}</span>
      <span data-testid="density">{density}</span>
      <span data-testid="radius">{radius}</span>
      <span data-testid="btn-default">{String(components.Button?.defaultProps?.size ?? '')}</span>
      <button onClick={toggleMode}>toggle</button>
      <button onClick={() => setDensity('compact')}>compact</button>
    </div>
  );
}

describe('@kreattix-ui/theme', () => {
  it('injects root CSS variables and switches mode and density', () => {
    render(
      <KreattixProvider
        theme={{
          colors: { primary: '#e11d48' },
          components: { Button: { defaultProps: { size: 'lg' } } },
        }}
      >
        <ThemeProbe />
      </KreattixProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('density')).toHaveTextContent('comfortable');
    expect(screen.getByTestId('btn-default')).toHaveTextContent('lg');
    expect(document.documentElement.getAttribute('data-kx-theme')).toBe('light');
    expect(document.documentElement.style.getPropertyValue('--kx-primary-600')).toBeTruthy();

    act(() => {
      screen.getByText('toggle').click();
      screen.getByText('compact').click();
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('density')).toHaveTextContent('compact');
    expect(document.documentElement.getAttribute('data-kx-theme')).toBe('dark');
  });

  it('supports nested scoped themes without mutating root', () => {
    const { container } = render(
      <KreattixProvider theme={{ mode: 'light' }}>
        <KreattixProvider theme={{ ...midnight, density: 'compact' }}>
          <ThemeProbe />
        </KreattixProvider>
      </KreattixProvider>
    );

    const scopedEl = container.querySelector('[data-kx-scoped="true"]') as HTMLElement;
    expect(scopedEl).toBeTruthy();
    expect(scopedEl.getAttribute('data-kx-theme')).toBe('dark');
    expect(scopedEl.getAttribute('data-kx-density')).toBe('compact');
    expect(document.documentElement.getAttribute('data-kx-theme')).toBe('light');
  });

  it('generates static CSS via generateThemeCss()', () => {
    const css = generateThemeCss({ mode: 'dark', colors: { primary: '#10b981' } });
    expect(css).toContain(':root {');
    expect(css).toContain('color-scheme: dark;');
    expect(css).toContain('--kx-primary-600:');
    expect(css).toContain('--kx-bg-canvas: #09090b;');
  });
});
