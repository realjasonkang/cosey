import { enhanceComponent, type EnhancedComponent } from '../utils';
import Ribbon from './ribbon';

export * from './ribbon.api';

const _Ribbon: EnhancedComponent<typeof Ribbon> = enhanceComponent(Ribbon);

export { _Ribbon as Ribbon };
export default _Ribbon;
