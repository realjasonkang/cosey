import { enhanceComponent, type EnhancedComponent } from '../utils';
import Highlight from './highlight';

export * from './highlight.api';

const _Highlight: EnhancedComponent<typeof Highlight> = enhanceComponent(Highlight);

export { _Highlight as Highlight };
export default _Highlight;
