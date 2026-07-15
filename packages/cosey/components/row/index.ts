import { enhanceComponent, type EnhancedComponent } from '../utils';
import Row from './row.vue';

export * from './row';

const _Row: EnhancedComponent<typeof Row> = enhanceComponent(Row);

export { _Row as Row };
export default _Row;
