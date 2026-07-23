import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';
import { Result } from '../utils/Result';

function arrayToTree(array: any[], idKey: string, pidKey: string, childrenKey: string) {
  const map: any = {};
  const nodes: any[] = [];
  for (const node of array) map[node[idKey]] = { ...node };
  for (const node of array) {
    const item = map[node[idKey]];
    const parent = map[node[pidKey]];
    if (parent) (parent[childrenKey] ??= []).push(item);
    else nodes.push(item);
  }
  return [nodes, map] as const;
}

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/rbac/permissions';

  interceptor.get(`${prefix}/tree`, async ({ res }) => {
    const rows = await db.permissions.orderBy('order').toArray();

    const [tree] = arrayToTree(rows, 'id', 'pid', 'children');

    res.json(Result.success(tree));
  });

  interceptor.get(`${prefix}/:id/parent/tree`, async ({ req, res }) => {
    const { id } = req.params;
    const rows = await db.permissions.orderBy('order').toArray();

    const [tree, map] = arrayToTree(rows, 'id', 'pid', 'children');

    const node = map[+id];
    const parent = map[node.pid as any];
    if (parent && parent.children) {
      parent.children.splice(parent.children.indexOf(node), 1);
    } else {
      tree.splice(tree.indexOf(node), 1);
    }

    res.json(Result.success(tree));
  });

  new Resource(prefix, db.permissions).intercept(interceptor);
}
