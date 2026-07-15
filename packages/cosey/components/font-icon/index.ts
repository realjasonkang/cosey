import { enhanceComponent, type EnhancedComponent } from '../utils';
import FontIcon from './font-icon';

export * from './font-icon.api';

const _FontIcon: EnhancedComponent<typeof FontIcon> = enhanceComponent(FontIcon);

export { _FontIcon as FontIcon };
export default _FontIcon;
