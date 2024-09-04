import { task, $ } from 'taskd';
import cpy from 'cpy';

export const clean = task('Clean', async () => {
  await $`rm -rf Comer.Runtime/gen/`;
  await $`rm -rf Comer.Runtime/bin/`;
  await $`rm -rf Comer.Runtime/obj/`;
  await $`rm -rf binary/`;
});

export const prebuild = task('Prebuild', [clean], async () => {
  await $`dotnet build Comer.Runtime/Comer.Runtime.prebuild.csproj`;
  await cpy(
    'Comer.Runtime/obj/Debug/**/generated/Comer.Runtime.Generator/**/*.g.cs',
    'Comer.Runtime/gen/',
    { flat: true }
  );
  // If there are unsupported exported types in the parent class, an error will occur. Try explicitly adding `[JSExport (false)]` to the parent class, and then it's fine
});

export const build = task('Build', [prebuild], async () => {
  await $`dotnet publish Comer.Runtime/Comer.Runtime.publish.csproj --ucr`;
  await cpy(
    'Comer.Runtime/bin/node/**/*.{ts,js,cjs,node,dylib}',
    'binary/',
    { flat: true }
  );
  await $`rm -rf binary/Comer.Runtime.dylib`;
  await $`tsc -p tsconfig.json`;
});

export const demo = task('Demo', async () => {
  await $`node ./demo/demo1.js`;
});

export const test = task('Test', async () => {
  await $`dotnet publish Comer.Runtime.Test/Comer.Runtime.Test.csproj --ucr`;
});