import { task, $ } from "taskd";

export const lint = task("代码风格检查", async () => {
  await $`eslint -v`;
  await $`eslint --fix ./packages/*/src/**/*.{ts,tsx}`;
});

export const clean = task("清理", async () => {
  await $`
  rm -rf ./packages/*/tsconfig.tsbuildinfo
  rm -rf ./packages/*/types/
  rm -rf ./packages/*/dist/
  rm -rf ./packages/*/lib/
  `;
});

export const build = task("构建", [clean, lint], async () => {
  await $`tsc -p ./packages/babel-preset-comer`;
  await $`tsc -p ./packages/comer`;
  await $`pnpm -F comer-demo build`;
});