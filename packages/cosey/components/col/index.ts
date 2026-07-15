import { enhanceComponent, type EnhancedComponent } from '../utils';
import Col from './col';

export * from './col.api';

const _Col: EnhancedComponent<typeof Col> = enhanceComponent(Col);

export { _Col as Col };
export default _Col;
