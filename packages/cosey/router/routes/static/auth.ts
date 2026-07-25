import { defineRoutes } from '../../utils';

import LayoutAuth from '../../../layout/layout-auth/layout-auth.vue';
import LayoutChangePassword from '../../../layout/layout-change-password/layout-change-password.vue';
import LayoutLogin from '../../../layout/layout-login/layout-login.vue';

/**
 * 身份验证相关路由
 */
export default defineRoutes({
  path: '/auth',
  name: 'Auth',
  component: LayoutAuth,
  meta: {
    hideInMenu: true,
  },
  children: [
    {
      path: 'login',
      name: 'Login',
      component: LayoutLogin,
      meta: {
        title: '登录',
        authentication: false,
      },
    },
    {
      path: 'change-password',
      name: 'ChangePassword',
      component: LayoutChangePassword,
      meta: {
        title: '修改密码',
      },
    },
  ],
});
