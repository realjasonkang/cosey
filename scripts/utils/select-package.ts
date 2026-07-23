import consola from 'consola';
import { repositories } from './const';

export async function selectPackage() {
  const pkgName = await consola.prompt('请选择包', {
    type: 'select',
    options: repositories,
  });
  return pkgName;
}
