import { task, $ } from 'taskd';
import cpy from 'cpy';

export const clean = task('Clean', async () => {
  await $`rm -rf Comer.Runtime/gen/`;
  await $`rm -rf Comer.Runtime/bin/`;
  await $`rm -rf Comer.Runtime/obj/`;
});

export const prebuild = task('Prebuild', [clean], async () => {
  await $`dotnet build Comer.Runtime/Comer.Runtime.prebuild.csproj`;
  await cpy(
    'Comer.Runtime/obj/Debug/**/generated/Comer.Runtime.Generator/**/*.g.cs',
    'Comer.Runtime/gen/',
    { flat: true }
  );
});

export const build = task('Build', [prebuild], async () => {
  await $`dotnet publish Comer.Runtime/Comer.Runtime.publish.csproj --ucr `;
});

export const demo = task('Demo', async () => {
  await $`node ./demo/demo1.js`;
});