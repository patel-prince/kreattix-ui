import { describe, expect, it } from 'vitest';
import { generateTemplateFiles, parseArgs } from '../index';

describe('create-kreattix-app CLI', () => {
  it('parses CLI arguments and generates Next.js App Router starter files', () => {
    const opts = parseArgs(['node', 'cli', 'acme-web', '--template', 'next', '--primary', '#0ea5e9', '--dry-run']);
    expect(opts.projectName).toBe('acme-web');
    expect(opts.template).toBe('next');
    expect(opts.primaryColor).toBe('#0ea5e9');
    expect(opts.dryRun).toBe(true);

    const files = generateTemplateFiles(opts);
    expect(files['package.json']).toContain('@kreattix/ui');
    expect(files['src/app/layout.tsx']).toContain('@kreattix/ui/styles.css');
    expect(files['src/app/layout.tsx']).toContain('ThemeInitScript');
    expect(files['src/app/layout.tsx']).toContain('#0ea5e9');
    expect(files['src/app/page.tsx']).toContain('acme-web');
  });

  it('generates Vite + React starter files when --template vite is passed', () => {
    const opts = parseArgs(['node', 'cli', 'vite-app', '--template', 'vite']);
    const files = generateTemplateFiles(opts);
    expect(files['src/main.tsx']).toContain('KreattixProvider');
    expect(files['src/App.tsx']).toContain('vite-app');
  });
});
