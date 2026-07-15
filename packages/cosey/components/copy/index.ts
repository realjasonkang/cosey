import { enhanceComponent, type EnhancedComponent } from '../utils';
import Copy from './copy';

export * from './copy.api';

const _Copy: EnhancedComponent<typeof Copy> = enhanceComponent(Copy);

export { _Copy as Copy };
export default _Copy;
