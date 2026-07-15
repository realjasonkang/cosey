import { enhanceComponent, type EnhancedComponent } from '../utils';
import TransitionGroup from './transition-group';

export * from './transition-group.api';

const _TransitionGroup: EnhancedComponent<typeof TransitionGroup> =
  enhanceComponent(TransitionGroup);

export { _TransitionGroup as TransitionGroup };
export default _TransitionGroup;
