import { task, $ } from 'taskd';

export const build = task('Build', async () => {
  $`dotnet publish --ucr`;
});

export const dev = task('Dev', [build], async () => {
  $`node ./demo/demo1.js`;
});