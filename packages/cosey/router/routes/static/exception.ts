import { defineRoutes } from '../../utils';
import LayoutException from '../../../layout/layout-exception/layout-exception.vue';
import LayoutForbidden from '../../../layout/layout-forbidden/layout-forbidden.vue';
import LayoutInternalServerError from '../../../layout/layout-internal-server-error/layout-internal-server-error.vue';
import { NotFoundRoute } from '../../not-found';

/**
 * 异常相关路由
 */
export default defineRoutes([
  {
    path: '/exception',
    name: 'Exception',
    component: LayoutException,
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
        component: LayoutForbidden,
        meta: {
          title: 'Forbidden',
        },
      },
      {
        path: 'internal-server-error',
        name: 'ExceptionInternalServerError',
        component: LayoutInternalServerError,
        meta: {
          title: 'Internal Server Error',
        },
      },
      NotFoundRoute,
    ],
  },
]);
