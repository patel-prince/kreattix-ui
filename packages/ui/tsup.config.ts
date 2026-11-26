import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    theme: 'src/theme.ts',
    tokens: 'src/tokens.ts',
    sections: 'src/sections.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@kreattix-ui/react',
    '@kreattix-ui/theme',
    '@kreattix-ui/tokens',
    '@kreattix-ui/sections',
  ],
  async onSuccess() {
    // Copy pre-built styles.css from @kreattix-ui/react
    const srcCss = path.resolve('../react/dist/styles.css');
    const destCss = path.resolve('dist/styles.css');
    if (fs.existsSync(srcCss)) {
      fs.copyFileSync(srcCss, destCss);
    }
  },
});
