import { task, $ } from 'taskd';
import cpy from 'cpy';

export const prebuild = task('Prebuild', async () => {
  await $`dotnet build Comer.Runtime/Comer.Runtime.prebuild.csproj`;
  await $`shopt -s globstar`;
  await cpy(
    'Comer.Runtime/obj/Debug/net8.0/generated/Comer.Runtime.Generator/*.g.cs',
    'Comer.Runtime/gen/'
  );
});

export const build = task('Build', [prebuild], async () => {
  await $`dotnet publish Comer.Runtime/Comer.Runtime.publish.csproj --ucr `;
});

export const dev = task('Dev', [build], async () => {
  await $`node ./demo/demo1.js`;
});