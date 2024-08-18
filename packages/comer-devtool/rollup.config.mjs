import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const createConfig = (page) => {
  return defineConfig({
    input: `./lib/${page}.js`,
    output: [
      {
        file: `./dist/${page}.js`,
        format: "esm",
        name: 'ComerDemo',
        minifyInternalExports: true,
      }
    ],
    plugins: [
      resolve(),
      terser(),
    ]
  });
};

export default [
  createConfig('popup'),
  createConfig('devtools'),
  createConfig('elements'),
];