import { enhanceComponent, type EnhancedComponent } from '../utils';
import FormList from './form-list.vue';

export * from './form-list.api';

const _FormList: EnhancedComponent<typeof FormList> = enhanceComponent(FormList);

export { _FormList as FormList };
export default _FormList;
