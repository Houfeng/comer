import { task, $ } from 'taskd';

export const lint = task('Lint', async () => {
  await $`eslint -v`;
  await $`eslint --fix --ext .ts ./packages/*/{src,tests}/`;
});

export const clean = task('Clean', async () => {
  await $`
  rm -rf ./packages/*/tsconfig.tsbuildinfo
  rm -rf ./packages/*/types/
  rm -rf ./packages/*/dist/
  rm -rf ./packages/*/build/
  rm -rf ./packages/*/lib/
  `;
});

export const test = task('Test', async () => {
  await $`c8 node --require ts-node/register --test tests/*.spec.ts`;
});

export const generate = task('Generate', async () => {
  await $`pnpm -F comer-dom generate`;
});

export const build = task('Build', [clean, generate, lint], async () => {
  await $`tsc -v`;
  await $`tsc -p ./packages/comer && pnpm -F comer build`;
  await $`tsc -p ./packages/comer-dom && pnpm -F comer-dom build`;
  await $`tsc -p ./packages/comer-devtool && pnpm -F comer-devtool build`;
  await $`pnpm -F comer-benchmark build`;
  await $`tsc -p ./packages/comer-demo`;
});

export const dev = task('Dev', [build], async () => {
  // await $`tsc -v`;
  // $`tsc -w -p ./packages/comer`;
  // $`tsc -w -p ./packages/comer-dom`;
  await $`pnpm -F comer-demo dev`;
});

export const devtool = task('DevTool', [build], async () => {
  await $`pnpm -F comer-devtool dev`;
});

export const benchmark = task('Benchmark', [build], async () => {
  await $`pnpm -F comer-benchmark dev`;
});

export const rt_build = task('Runtime Build', async () => {
  await $`cd ./packages/comer-runtime && task build`;
});

export const rt_demo = task('Runtime Demo', async () => {
  await $`cd ./packages/comer-runtime && task demo`;
});
