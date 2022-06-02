import { ObserveMode } from 'ober';
import commonjs from 'rollup-plugin-commonjs';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
const babel = require('rollup-plugin-babel');

const createConf = (page) => {
  return {
    input: `./src/${page}.tsx`,
    output: [
      {
        file: `./dist/js/${page}.js`,
        format: 'iife',
        sourcemap: true,
        name: 'ObecDemo'
      }
    ],
    plugins: [
      resolve(),
      commonjs({
        ignoreDynamicRequires: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      sourcemaps(),
      injectProcessEnv({
        OBER_CONFIG: { mode: ObserveMode.property },
      }),
    ]
  };
};

export default [
  createConf('develop'),
];