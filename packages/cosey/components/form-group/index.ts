import { enhanceComponent, type EnhancedComponent } from '../utils';
import FormGroup from './form-group';

export * from './form-group.api';

const _FormGroup: EnhancedComponent<typeof FormGroup> = enhanceComponent(FormGroup);

export { _FormGroup as FormGroup };
export default _FormGroup;
