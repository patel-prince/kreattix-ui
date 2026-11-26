'use client';

import React from 'react';
import { Alert, Heading, Stack, Text } from '@kreattix-ui/react';
import { CodeBlock } from '@/components/CodeBlock';

export default function GettingStartedPage() {
  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <Heading level={1} size="3xl">Getting Started</Heading>
        <Text size="lg" tone="secondary">
          Install Kreattix UI in React 18/19 or Next.js App Router with zero icon lock-in.
        </Text>
      </Stack>

      <CodeBlock
        title="1. Install packages"
        code={`npm install @kreattix-ui/react @kreattix-ui/theme @kreattix-ui/tokens\n# Optional recommended icon library:\nnpm install lucide-react`}
      />

      <CodeBlock
        title="2. Next.js App Router (app/layout.tsx)"
        code={`import '@kreattix-ui/react/styles.css';\nimport { KreattixProvider, ThemeInitScript } from '@kreattix-ui/theme';\nimport { ToastProvider } from '@kreattix-ui/react';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <head>\n        <ThemeInitScript storageKey="kx-theme-mode" defaultMode="light" />\n      </head>\n      <body>\n        <KreattixProvider storageKey="kx-theme-mode">\n          <ToastProvider>{children}</ToastProvider>\n        </KreattixProvider>\n      </body>\n    </html>\n  );\n}`}
      />

      <CodeBlock
        title="3. Use any component with Dual Ergonomics & TypeScript"
        code={`'use client';\nimport { Button, Dialog, Input, Stack } from '@kreattix-ui/react';\nimport { Mail } from 'lucide-react';\n\nexport function InviteModal() {\n  return (\n    <Dialog\n      trigger={<Button>Invite Member</Button>}\n      title="Invite Teammate"\n      description="Send an invitation link via email."\n    >\n      <Stack gap={4}>\n        <Input label="Email" leftAddon={<Mail size={15} />} required />\n        <Button fullWidth>Send Invite</Button>\n      </Stack>\n    </Dialog>\n  );\n}`}
      />

      <Alert
        tone="info"
        title="Zero-JS Static CSS Extraction"
        description="Need static CSS without client hydration? Call generateThemeCss(config) from @kreattix-ui/theme at build time or inside a Server Component."
      />
    </Stack>
  );
}
