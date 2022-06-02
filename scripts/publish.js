const { dirname } = require("path");
const { formatDate } = require("ntils");

const { CI, DN_ENV } = process.env;

module.exports = () => {
  return async (next, ctx) => {
    const { console, utils } = ctx;
    const tag = DN_ENV || 'latest';
    console.info('发布: 生成 Tag', tag);
    console.log('发布: 生成版本号');
    if (!CI) await ctx.exec({ name: 'version' });
    const pkgFiles = (await utils.files('./packages/*/package.json'));
    const buildId = formatDate(new Date(), 'yyyyMMddhhmmss');
    const version = CI
      ? `${ctx.project.version}-${tag}.${buildId}`
      : ctx.project.version;
    await Promise.all(pkgFiles.map(async (file) => {
      await utils.exec([
        `cd ${dirname(file)}`,
        `npm version ${version} --allow-same-version --no-git-tag-version --no-commit-hooks`
      ])
    }));
    if (!CI) console.log('发布: 重新构建');
    if (!CI) await utils.exec([`dn run test && dn run build`]);
    console.log('发布: 执行发布');
    await Promise.all(pkgFiles.map(async (file) => {
      await utils.exec([
        `cd ${dirname(file)}`,
        `npm pu --tag ${tag}`
      ])
    }));
    console.log('发布: 提交代码');
    if (!CI) await ctx.exec({ name: 'submitter' });
    next();
  };
}