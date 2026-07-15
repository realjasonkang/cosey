import { enhanceComponent, type EnhancedComponent } from '../utils';
import FormQuery from './form-query';

export * from './form-query.api';

const _FormQuery: EnhancedComponent<typeof FormQuery> = enhanceComponent(FormQuery);

export { _FormQuery as FormQuery };
export default _FormQuery;
