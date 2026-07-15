import { enhanceComponent, type EnhancedComponent } from '../utils';
import SnugMenu from './snug-menu.vue';
import SnugMenuItem from './snug-menu-item.vue';

export * from './snug-menu';
export * from './snug-menu-item';

const _SnugMenu: EnhancedComponent<typeof SnugMenu> = enhanceComponent(SnugMenu);
const _SnugMenuItem: EnhancedComponent<typeof SnugMenuItem> = enhanceComponent(SnugMenuItem);

export { _SnugMenu as SnugMenu, _SnugMenuItem as SnugMenuItem };
export default _SnugMenu;
