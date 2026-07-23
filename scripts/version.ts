import fsp from 'node:fs/promises';
import path from 'node:path';
import consola from 'consola';
import inquirer from 'inquirer';
import semver, { type ReleaseType } from 'semver';

import { packagesDir } from './utils/const';
import { selectPackage } from './utils/select-package';

let pkgName = '';
let pkgSrcDir = '';

async function readVersion() {
  const { default: pkgJson } = await import(path.resolve(pkgSrcDir, 'package.json'), {
    with: { type: 'json' },
  });

  return pkgJson.version;
}

async function inputVersion() {
  const currVersion = await readVersion();

  consola.info(`当前版本号为：${currVersion}`);

  const releaseTypes: ReleaseType[] = [
    'patch',
    'prepatch',
    'minor',
    'preminor',
    'major',
    'premajor',
    'prerelease',
  ];

  const form = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择下一版本号',
      choices: releaseTypes.map((type) => {
        return {
          name: `${type}: ${semver.inc(currVersion, type)}`,
          value: semver.inc(currVersion, type),
        };
      }),
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '确定修改版本号？',
    },
  ]);

  if (!form.confirm) {
    consola.warn('已取消修改版本号');
    process.exit(1);
  }

  return form.version;
}

async function updateVersion() {
  pkgName = await selectPackage();
  pkgSrcDir = path.resolve(packagesDir, pkgName);

  const version = await inputVersion();

  const pkgJsonPath = path.resolve(packagesDir, `${pkgName}/package.json`);

  const { default: pkgJson } = await import(pkgJsonPath, {
    with: { type: 'json' },
  });

  pkgJson.version = version;
  await fsp.writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
}

async function version() {
  await updateVersion();
  consola.success(`更新版本号成功`);
}

version();
