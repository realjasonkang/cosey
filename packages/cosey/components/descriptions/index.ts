import { enhanceComponent, type EnhancedComponent } from '../utils';
import Descriptions from './descriptions';

export * from './descriptions';

const _Descriptions: EnhancedComponent<typeof Descriptions> = enhanceComponent(Descriptions);

export { _Descriptions as Descriptions };
export default _Descriptions;
