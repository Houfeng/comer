import { task, $, version } from 'taskd';

console.warn('+++++++', { version })

export const build = task('Build', async () => {
  $`dotnet publish --ucr`;
});

export const dev = task('Dev', [build], async () => {
  $`node ./demo/demo1.js`;
});