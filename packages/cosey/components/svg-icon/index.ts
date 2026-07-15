import { enhanceComponent, type EnhancedComponent } from '../utils';
import SvgIcon from './svg-icon';

export * from './svg-icon.api';

const _SvgIcon: EnhancedComponent<typeof SvgIcon> = enhanceComponent(SvgIcon);

export { _SvgIcon as SvgIcon };
export default _SvgIcon;
