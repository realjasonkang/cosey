import { defineRoutes } from '../../utils';

import LayoutAuth from '../../../layout/layout-auth/layout-auth.vue';
import LayoutChangePassword from '../../../layout/layout-change-password/layout-change-password.vue';
import LayoutLogin from '../../../layout/layout-login/layout-login.vue';
import { useGlobalConfig } from '../../../config/index.ts';
import { useOptionalComponent } from '../../../hooks/useOptionalComponent.ts';
import { h } from 'vue';

/**
 * 身份验证相关路由
 */
export default defineRoutes({
  path: '/auth',
  name: 'Auth',
  component: {
    setup() {
      const { components } = useGlobalConfig();
      const AuthComp = useOptionalComponent(() => components?.auth, LayoutAuth);
      return () => h(AuthComp.value);
    },
  },
  meta: {
    hideInMenu: true,
  },
  children: [
    {
      path: 'login',
      name: 'Login',
      component: {
        setup() {
          const { components } = useGlobalConfig();
          const LoginComp = useOptionalComponent(() => components?.login, LayoutLogin);
          return () => h(LoginComp.value);
        },
      },
      meta: {
        title: '登录',
        authentication: false,
      },
    },
    {
      path: 'change-password',
      name: 'ChangePassword',
      component: {
        setup() {
          const { components } = useGlobalConfig();
          const ChangePasswordComp = useOptionalComponent(
            () => components?.changePassword,
            LayoutChangePassword,
          );
          return () => h(ChangePasswordComp.value);
        },
      },
      meta: {
        title: '修改密码',
      },
    },
  ],
});
