import path from 'node:path';
import { copyFile } from 'node:fs/promises';

import { packagesDir, distDir } from './utils/const';
import { build as baseBuild } from './utils/build';
import { selectPackage } from './utils/select-package';

let pkgName = '';
let pkgSrcDir = '';
let pkgDistDir = '';

async function copyRootReadme(outDir: string) {
  await copyFile(path.resolve(process.cwd(), 'README.md'), path.resolve(outDir, 'README.md'));
}

async function build() {
  pkgName = await selectPackage();
  pkgDistDir = path.resolve(distDir, pkgName);
  pkgSrcDir = path.resolve(packagesDir, pkgName);

  await baseBuild({
    rootDir: pkgSrcDir,
    outDir: pkgDistDir,
    tasks:
      pkgName === 'cosey'
        ? [
            {
              title: `复制根 README.md 文件`,
              task: () => copyRootReadme(pkgDistDir),
            },
          ]
        : undefined,
  });
}

build();
