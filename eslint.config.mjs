import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    }
  }
);