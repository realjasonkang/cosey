import { enhanceComponent, type EnhancedComponent } from '../utils';
import LongText from './long-text';

export * from './long-text.api';

const _LongText: EnhancedComponent<typeof LongText> = enhanceComponent(LongText);

export { _LongText as LongText };
export default _LongText;
