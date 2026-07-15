import { enhanceComponent, type EnhancedComponent } from '../utils';
import Field from './field';

export * from './field.api';

const _Field: EnhancedComponent<typeof Field> = enhanceComponent(Field);

export { _Field as Field };
export default _Field;
