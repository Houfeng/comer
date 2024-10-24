import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function createConfig(format, min = false, external = void 0, global = void 0) {
  const suffix = min ? 'min.js' : 'js';
  return defineConfig({
    input: './lib/index.js',
    output: {
      file: `./dist/comer.${format}.${suffix}`,
      format: format,
      name: "Comer"
    },
    external: external,
    global: global,
    plugins: [
      resolve(),
      min ? terser() : void 0,
    ].filter(it => !!it),
  });
}

export default [
  createConfig('iife', false),
  createConfig('iife', true),
  createConfig('umd', false),
  createConfig('umd', true),
  createConfig('esm', false, ['ober', 'tslib']),
  createConfig('cjs', false, ['ober', 'tslib']),
]