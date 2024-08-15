import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';

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
      nodeResolve(),
      //terser(),
    ]
  });
};

export default [
  createConfig('index'),
  createConfig('elements'),
  createConfig('popup'),
];