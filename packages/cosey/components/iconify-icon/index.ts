import { enhanceComponent, type EnhancedComponent } from '../utils';
import IconifyIcon from './iconify-icon';

export * from './iconify-icon.api';

const _IconifyIcon: EnhancedComponent<typeof IconifyIcon> = enhanceComponent(IconifyIcon);

export { _IconifyIcon as IconifyIcon };
export default _IconifyIcon;
