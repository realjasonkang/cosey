import { LayoutBase, defineRoutes } from 'cosey';

/**
 * 仪表板路由
 */
export default defineRoutes({
  path: '/dashboard',
  name: 'Dashboard',
  component: LayoutBase,
  meta: {
    title: 'dashboard.dashboard',
    icon: 'carbon:dashboard',
    order: -10,
    authority: (ability) => ability.can('read', 'analysis') || ability.can('read', 'workspace'),
  },
  children: [
    {
      path: 'workspace',
      name: 'Workspace',
      component: () => import('@/views/dashboard/workspace.vue'),
      meta: {
        title: 'dashboard.workspace',
        icon: 'carbon:workspace',
        closable: false,
        authority: (ability) => ability.can('read', 'workspace'),
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: 'dashboard.analytics',
        icon: 'carbon:analytics',
        authority: (ability) => ability.can('read', 'analysis'),
      },
    },
  ],
});
