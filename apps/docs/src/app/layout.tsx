import React from 'react';
import type { Metadata } from 'next';
import '@kreattix-ui/react/styles.css';
import './docs.css';
import { ThemeInitScript } from '@kreattix-ui/theme';
import { DocsProviders } from '@/components/DocsProviders';
import { DocsShell } from '@/components/DocsShell';

export const metadata: Metadata = {
  title: 'Kreattix UI — High-Performance Radix-Powered React Design System',
  description:
    'Zero-runtime CSS variables, 3-tier ThemeProvider, Dual Ergonomics, and 29+ accessible components powered by Radix Primitives.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript storageKey="kx-docs-mode" defaultMode="light" />
      </head>
      <body>
        <DocsProviders>
          <DocsShell>{children}</DocsShell>
        </DocsProviders>
      </body>
    </html>
  );
}
