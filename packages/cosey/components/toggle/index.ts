import { enhanceComponent, type EnhancedComponent } from '../utils';
import Toggle from './toggle';

export * from './toggle.api';

const _Toggle: EnhancedComponent<typeof Toggle> = enhanceComponent(Toggle);

export { _Toggle as Toggle };
export default _Toggle;
