import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const createConf = ({ name = 'index', min } = {}) => {
  const suffix = min ? '.min' : '';
  return {
    input: './src/index.ts',
    output: [
      {
        file: `./dist/${name}-es${suffix}.js`,
        format: 'es'
      },
      {
        file: `./dist/${name}-cjs${suffix}.js`,
        format: 'cjs'
      },
      {
        file: `./dist/${name}-umd${suffix}.js`,
        format: 'umd',
        name: name
      },
      {
        file: `./dist/${name}-iife${suffix}.js`,
        format: 'iife',
        name: name
      }
    ],
    plugins: [
      resolve(),
      min && terser(),
      cleanup({ comments: 'none' }),
      typescript({
        tsconfig: require.resolve('./tsconfig.json'),
        useTsconfigDeclarationDir: true,
      }),
    ].filter(Boolean)
  };
};

export default [
  createConf(),
];