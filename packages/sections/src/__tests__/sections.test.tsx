import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SECTIONS_CATALOG } from '../index';

describe('@kreattix-ui/sections', () => {
  it('exports 82 readymade sections across 10 categories and renders all without errors', () => {
    expect(SECTIONS_CATALOG.length).toBe(82);
    for (const item of SECTIONS_CATALOG) {
      const Comp = item.Component;
      const { unmount } = render(<Comp />);
      unmount();
    }
  });
});
