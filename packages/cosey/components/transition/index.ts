import { enhanceComponent, type EnhancedComponent } from '../utils';
import Transition from './transition';

export * from './transition.api';

const _Transition: EnhancedComponent<typeof Transition> = enhanceComponent(Transition);

export { _Transition as Transition };
export default _Transition;
