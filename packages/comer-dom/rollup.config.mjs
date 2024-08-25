import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function createConfig(min = false) {
  const suffix = min ? 'min.js' : 'js';
  return defineConfig({
    input: './lib/index.js',
    output: [
      // {
      //   file: `./dist/comer-dom.es.${suffix}`,
      //   format: 'esm'
      // },
      // {
      //   file: `./dist/comer-dom.cjs.${suffix}`,
      //   format: 'cjs'
      // },
      {
        file: `./dist/comer-dom.umd.${suffix}`,
        format: 'umd',
        name: "ComerDOM",
        globals: { comer: "Comer" }
      },
      {
        file: `./dist/comer-dom.iife.${suffix}`,
        format: 'iife',
        name: "ComerDOM",
        globals: { comer: "Comer" }
      }
    ],
    external: ["comer"],
    plugins: [
      resolve(),
      min ? terser() : void 0,
    ].filter(it => !!it),
  });
}

export default [createConfig(false), createConfig(true)]