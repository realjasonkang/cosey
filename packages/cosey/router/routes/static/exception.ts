import { defineRoutes } from '../../utils';
import LayoutException from '../../../layout/layout-exception/layout-exception.vue';
import LayoutForbidden from '../../../layout/layout-forbidden/layout-forbidden.vue';
import LayoutInternalServerError from '../../../layout/layout-internal-server-error/layout-internal-server-error.vue';
import { NotFoundRoute } from '../../not-found';
import { h } from 'vue';
import { useGlobalConfig } from '../../../config/index.ts';
import { useOptionalComponent } from '../../../hooks/useOptionalComponent.ts';

/**
 * 异常相关路由
 */
export default defineRoutes([
  {
    path: '/exception',
    name: 'Exception',
    component: {
      setup() {
        const { components } = useGlobalConfig();
        const ExceptionComp = useOptionalComponent(() => components?.exception, LayoutException);
        return () => h(ExceptionComp.value);
      },
    },
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        ...NotFoundRoute,
        path: '',
        name: undefined,
      },
      {
        path: 'forbidden',
        name: 'ExceptionForbidden',
        component: {
          setup() {
            const { components } = useGlobalConfig();
            const ForbiddenComp = useOptionalComponent(
              () => components?.forbidden,
              LayoutForbidden,
            );
            return () => h(ForbiddenComp.value);
          },
        },
        meta: {
          title: 'Forbidden',
        },
      },
      {
        path: 'internal-server-error',
        name: 'ExceptionInternalServerError',
        component: {
          setup() {
            const { components } = useGlobalConfig();
            const InternalServerErrorComp = useOptionalComponent(
              () => components?.internalServerError,
              LayoutInternalServerError,
            );
            return () => h(InternalServerErrorComp.value);
          },
        },
        meta: {
          title: 'Internal Server Error',
        },
      },
      NotFoundRoute,
    ],
  },
]);
