import fs from 'node:fs';
import path from 'node:path';

export interface ScaffoldOptions {
  projectName: string;
  template: 'next' | 'vite';
  primaryColor: string;
  targetDir: string;
  dryRun?: boolean;
}

export function generateTemplateFiles(opts: ScaffoldOptions): Record<string, string> {
  const { projectName, template, primaryColor } = opts;

  const pkgJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts:
      template === 'next'
        ? { dev: 'next dev', build: 'next build', start: 'next start' }
        : { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: {
      '@kreattix/ui': '^0.1.0',
      'lucide-react': '^0.511.0',
      react: '^19.1.0',
      'react-dom': '^19.1.0',
      ...(template === 'next' ? { next: '^15.5.0' } : {}),
    },
    devDependencies: {
      '@types/react': '^19.1.6',
      '@types/react-dom': '^19.1.5',
      typescript: '^5.8.3',
      ...(template === 'vite' ? { '@vitejs/plugin-react': '^4.4.1', vite: '^6.3.5' } : {}),
    },
  };

  if (template === 'next') {
    return {
      'package.json': JSON.stringify(pkgJson, null, 2) + '\n',
      'src/app/layout.tsx': `import React from 'react';
import '@kreattix/ui/styles.css';
import { KreattixProvider, ThemeInitScript, ToastProvider } from '@kreattix/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript storageKey="kx-mode" defaultMode="light" />
      </head>
      <body>
        <KreattixProvider storageKey="kx-mode" theme={{ colors: { primary: '${primaryColor}' } }}>
          <ToastProvider>{children}</ToastProvider>
        </KreattixProvider>
      </body>
    </html>
  );
}
`,
      'src/app/page.tsx': `'use client';

import React from 'react';
import { Badge, Button, Card, Container, Heading, HStack, Stack, Text, toast } from '@kreattix/ui';

export default function HomePage() {
  return (
    <Container size="md" style={{ paddingBlock: '4rem' }}>
      <Card variant="elevated">
        <Card.Body>
          <Stack gap={4}>
            <Badge tone="primary" style={{ alignSelf: 'flex-start' }}>Kreattix UI Ready</Badge>
            <Heading level={1} size="2xl">${projectName}</Heading>
            <Text tone="secondary">
              Powered by zero-runtime CSS variables, Radix UI Primitives, and 3-tier theming.
            </Text>
            <HStack gap={3}>
              <Button onClick={() => toast({ title: 'Welcome to Kreattix UI!', tone: 'success' })}>
                Test Toast
              </Button>
            </HStack>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
`,
    };
  }

  return {
    'package.json': JSON.stringify(pkgJson, null, 2) + '\n',
    'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import '@kreattix/ui/styles.css';
import { KreattixProvider, ToastProvider } from '@kreattix/ui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KreattixProvider theme={{ colors: { primary: '${primaryColor}' } }}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </KreattixProvider>
  </React.StrictMode>
);
`,
    'src/App.tsx': `import React from 'react';
import { Button, Container, Heading, Stack, Text } from '@kreattix/ui';

export default function App() {
  return (
    <Container size="md" style={{ paddingBlock: '4rem' }}>
      <Stack gap={4}>
        <Heading level={1} size="2xl">${projectName}</Heading>
        <Text tone="secondary">Built with Kreattix UI + Vite.</Text>
        <Button>Get Started</Button>
      </Stack>
    </Container>
  );
}
`,
  };
}

export function scaffoldProject(opts: ScaffoldOptions): string[] {
  const files = generateTemplateFiles(opts);
  const written: string[] = [];

  for (const [relPath, content] of Object.entries(files)) {
    const absPath = path.join(opts.targetDir, relPath);
    written.push(absPath);
    if (!opts.dryRun) {
      fs.mkdirSync(path.dirname(absPath), { recursive: true });
      fs.writeFileSync(absPath, content, 'utf8');
    }
  }
  return written;
}

export function parseArgs(argv: string[]): ScaffoldOptions {
  const args = argv.slice(2);
  let projectName = 'my-kreattix-app';
  let template: 'next' | 'vite' = 'next';
  let primaryColor = '#4f46e5';
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    const a = args[i]!;
    if (a === '--template' && args[i + 1]) {
      const val = args[++i];
      if (val === 'vite' || val === 'next') template = val;
    } else if (a === '--primary' && args[i + 1]) {
      primaryColor = args[++i]!;
    } else if (a === '--dry-run') {
      dryRun = true;
    } else if (!a.startsWith('-')) {
      projectName = a;
    }
  }

  return {
    projectName,
    template,
    primaryColor,
    targetDir: path.resolve(process.cwd(), projectName),
    dryRun,
  };
}

if (typeof require !== 'undefined' && require.main === module) {
  const opts = parseArgs(process.argv);
  const files = scaffoldProject(opts);
  console.log(
    opts.dryRun
      ? `[dry-run] Would create ${files.length} files in ${opts.targetDir}`
      : `Created ${opts.projectName} (${opts.template}) in ${opts.targetDir}`
  );
}
