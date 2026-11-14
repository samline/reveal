import { defineConfig } from 'tsup'

// @samline/internal and @samline/is-visible are a devDependency bundled into every
// build (noExternal), so @samline/reveal ships with no runtime dependencies.
const noExternal = [/^@samline\//]

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'vanilla/index': 'src/vanilla/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: { resolve: noExternal },
    sourcemap: true,
    clean: true,
    target: 'es2020',
    treeshake: true,
    noExternal,
  },
  {
    // Plain CSS, copied as written so it stays readable and overridable.
    entry: { style: 'src/style.css' },
    clean: false,
  },
  {
    entry: { 'browser/reveal': 'src/browser/global.ts' },
    format: ['iife'],
    minify: true,
    sourcemap: true,
    clean: false,
    target: 'es2020',
    platform: 'browser',
    noExternal,
    outExtension: () => ({ js: '.global.js' }),
  },
])
