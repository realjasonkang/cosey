import { enhanceComponent, type EnhancedComponent } from '../utils';
import HorizontalTree from './horizontal-tree';

export * from './horizontal-tree.api';

const _HorizontalTree: EnhancedComponent<typeof HorizontalTree> = enhanceComponent(HorizontalTree);

export { _HorizontalTree as HorizontalTree };
export default _HorizontalTree;
