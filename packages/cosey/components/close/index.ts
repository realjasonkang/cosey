import { enhanceComponent, type EnhancedComponent } from '../utils';
import Close from './close';

export * from './close.api';

const _Close: EnhancedComponent<typeof Close> = enhanceComponent(Close);

export { _Close as Close };
export default _Close;
