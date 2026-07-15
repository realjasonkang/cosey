import { enhanceComponent, type EnhancedComponent } from '../utils';
import OnlyChild from './only-child';

const _OnlyChild: EnhancedComponent<typeof OnlyChild> = enhanceComponent(OnlyChild);

export { _OnlyChild as OnlyChild };
export default _OnlyChild;
