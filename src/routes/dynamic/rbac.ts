import { defineRoutes, LayoutBase } from 'cosey';

export default defineRoutes({
  path: '/rbac',
  name: 'Rbac',
  component: LayoutBase,
  meta: {
    title: 'rbac.accessControl',
    icon: 'carbon:user-access',
    order: 100,
    authority: (ability) =>
      ability.can('read', 'rbac_user') ||
      ability.can('read', 'rbac_role') ||
      ability.can('read', 'rbac_permission'),
  },
  children: [
    {
      path: 'admins',
      name: 'RbacAdmins',
      component: () => import('@/views/rbac/admins/index.vue'),
      meta: {
        title: 'rbac.accounts',
        icon: 'carbon:user-admin',
        authority: (ability) => ability.can('read', 'rbac_user'),
      },
    },
    {
      path: 'roles',
      name: 'RbacRoles',
      component: () => import('@/views/rbac/roles/index.vue'),
      meta: {
        title: 'rbac.roles',
        icon: 'carbon:user-role',
        authority: (ability) => ability.can('read', 'rbac_role'),
      },
    },
    {
      path: 'permissions',
      name: 'RbacPermissions',
      component: () => import('@/views/rbac/permissions/index.vue'),
      meta: {
        title: 'rbac.permissions',
        icon: 'carbon:rule',
        authority: (ability) => ability.can('read', 'rbac_permission'),
      },
    },
  ],
});
