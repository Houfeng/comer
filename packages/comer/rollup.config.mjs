import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function createConfig(min = false) {
  const suffix = min ? 'min.js' : 'js';
  return defineConfig({
    input: './lib/index.js',
    output: [
      // {
      //   file: `./dist/comer.es.${suffix}`,
      //   format: 'esm'
      // },
      // {
      //   file: `./dist/comer.cjs.${suffix}`,
      //   format: 'cjs'
      // },
      {
        file: `./dist/comer.umd.${suffix}`,
        format: 'umd',
        name: "Comer"
      },
      {
        file: `./dist/comer.iife.${suffix}`,
        format: 'iife',
        name: "Comer"
      }
    ],
    plugins: [
      resolve(),
      min ? terser() : void 0,
    ].filter(it => !!it),
  });
}

export default [createConfig(false), createConfig(true)]