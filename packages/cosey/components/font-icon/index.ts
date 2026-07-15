import { withInstall } from '../utils';
import FontIcon from './font-icon';

export * from './font-icon.api';

const _FontIcon = withInstall(FontIcon);

export { _FontIcon as FontIcon };
export default _FontIcon;
