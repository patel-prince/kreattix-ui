import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@kreattix-ui/tokens': path.resolve(__dirname, 'packages/tokens/src/index.ts'),
      '@kreattix-ui/theme': path.resolve(__dirname, 'packages/theme/src/index.ts'),
      '@kreattix-ui/react': path.resolve(__dirname, 'packages/react/src/index.ts'),
      '@kreattix-ui/sections': path.resolve(__dirname, 'packages/sections/src/index.ts'),
      '@kreattix/ui': path.resolve(__dirname, 'packages/ui/src/index.ts'),
    },
  },
});
