import type React from 'react';

export type ComponentCategory =
  | 'Layout'
  | 'Display'
  | 'Actions'
  | 'Forms'
  | 'Feedback & Navigation'
  | 'Overlays'
  | 'Enterprise Data';

export interface PlaygroundControl {
  name: string;
  label: string;
  type: 'select' | 'boolean' | 'text' | 'number';
  options?: string[];
  defaultValue: string | boolean | number;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  render: () => React.ReactNode;
}

export interface PropDocRow {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  required?: boolean;
}

export interface CssVarRow {
  token: string;
  defaultValue: string;
  description: string;
}

export interface A11yRow {
  key: string;
  description: string;
}

export interface ComponentDocEntry {
  slug: string;
  name: string;
  category: ComponentCategory;
  radix?: string;
  summary: string;
  description: string;
  importCode: string;
  playgroundControls: PlaygroundControl[];
  renderPlayground: (values: Record<string, string | boolean | number>) => React.ReactNode;
  generatePlaygroundCode: (values: Record<string, string | boolean | number>) => string;
  examples: ComponentExample[];
  props: PropDocRow[];
  slots: { name: string; description: string }[];
  cssVars: CssVarRow[];
  a11y: A11yRow[];
}
