import LayoutNotFound from '../layout/layout-not-found/layout-not-found.vue';
import { defineRoute } from './utils';

export const NOT_FOUND_ROUTE_NAME = 'ExceptionNotFound';

export const NotFoundRoute = defineRoute({
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  component: LayoutNotFound,
  meta: {
    title: 'Not Found',
  },
});
