import { enhanceComponent, type EnhancedComponent } from '../utils';
import Table from './table.vue';

export * from './table';
export * from './table-column/table-column.api';
export * from './table-query/table-query.api';
export * from './useTable';

const _Table: EnhancedComponent<typeof Table> = enhanceComponent(Table);

export { _Table as Table };
export default _Table;
