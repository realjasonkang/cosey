import { enhanceComponent, type EnhancedComponent } from '../utils';
import Mask from './mask';

export * from './mask.api';

const _Mask: EnhancedComponent<typeof Mask> = enhanceComponent(Mask);

export { _Mask as Mask };
export default _Mask;
