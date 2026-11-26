'use client';

import React from 'react';
import { KreattixProvider } from '@kreattix-ui/theme';
import { ToastProvider } from '@kreattix-ui/react';

export function DocsProviders({ children }: { children: React.ReactNode }) {
  return (
    <KreattixProvider storageKey="kx-docs-mode">
      <ToastProvider>{children}</ToastProvider>
    </KreattixProvider>
  );
}
