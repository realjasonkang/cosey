import path from 'node:path';

export const packagesDir = path.resolve(process.cwd(), 'packages');

export const distDir = path.resolve(process.cwd(), 'lib-dist');

export const mapPackageDirName = {
  cosey: 'cosey',
  '@cosey/mock': 'mock',
  '@cosey/request-interceptor': 'request-interceptor',
  '@cosey/icons': 'icons',
};

export const repositories = Object.values(mapPackageDirName);
