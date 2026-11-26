import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    styles: 'src/styles/kreattix.css',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', '@kreattix-ui/tokens', '@kreattix-ui/theme'],
  async onSuccess() {
    for (const file of ['dist/index.js', 'dist/index.cjs']) {
      const fullPath = path.resolve(file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (!content.startsWith("'use client'")) {
          fs.writeFileSync(fullPath, `'use client';\n${content}`, 'utf8');
        }
      }
    }
  },
});
