import { enhanceComponent, type EnhancedComponent } from '../utils';
import Container from './container';

export * from './container.api';

const _Container: EnhancedComponent<typeof Container> = enhanceComponent(Container);

export { _Container as Container };
export default _Container;
