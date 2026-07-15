import { enhanceComponent, type EnhancedComponent } from '../utils';
import TableAction from './table-action';

export * from './table-action.api';

const _TableAction: EnhancedComponent<typeof TableAction> = enhanceComponent(TableAction);

export { _TableAction as TableAction };
export default _TableAction;
