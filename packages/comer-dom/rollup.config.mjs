import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function createConfig(format, min = false, external = void 0, global = void 0) {
  const suffix = min ? 'min.js' : 'js';
  return defineConfig({
    input: './lib/index.js',
    output: {
      file: `./dist/comer-dom.${format}.${suffix}`,
      format: format,
      name: "ComerDOM"
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
  createConfig('iife', false, ['comer'], { comer: 'Comer' }),
  createConfig('iife', true, ['comer'], { comer: 'Comer' }),
  createConfig('umd', false, ['comer'], { comer: 'Comer' }),
  createConfig('umd', true, ['comer'], { comer: 'Comer' }),
  createConfig('esm', false, ['comer', 'tslib']),
  createConfig('cjs', false, ['comer', 'tslib']),
]