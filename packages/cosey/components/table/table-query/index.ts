import { enhanceComponent, type EnhancedComponent } from '../../utils';
import TableQuery from './table-query';

export * from './table-query.api';

const _TableQuery: EnhancedComponent<typeof TableQuery> = enhanceComponent(TableQuery);

export { _TableQuery as TableQuery };
export default _TableQuery;
