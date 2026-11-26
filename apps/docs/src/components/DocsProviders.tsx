'use client';

import React from 'react';
import { KreattixProvider, ToastProvider } from '@kreattix/ui';

export function DocsProviders({ children }: { children: React.ReactNode }) {
  return (
    <KreattixProvider storageKey="kx-docs-mode">
      <ToastProvider>{children}</ToastProvider>
    </KreattixProvider>
  );
}
