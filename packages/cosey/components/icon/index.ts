import { enhanceComponent, type EnhancedComponent } from '../utils';
import Icon from './icon';

export * from './icon.api';

const _Icon: EnhancedComponent<typeof Icon> = enhanceComponent(Icon);

export { _Icon as Icon };
export default _Icon;
