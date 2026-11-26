import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, KreattixProvider, generateColorScale } from '../index';
import { HeroCentered } from '../sections';

describe('@kreattix/ui umbrella package', () => {
  it('exports theme provider, components, token helpers, and sections from one install', () => {
    const scale = generateColorScale('#0ea5e9');
    expect(scale['600']).toBeTruthy();

    render(
      <KreattixProvider theme={{ colors: { primary: '#0ea5e9' } }}>
        <Button>Single Install</Button>
        <HeroCentered title="Unified Package" />
      </KreattixProvider>
    );

    expect(screen.getByRole('button', { name: 'Single Install' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Unified Package' })).toBeInTheDocument();
  });
});
