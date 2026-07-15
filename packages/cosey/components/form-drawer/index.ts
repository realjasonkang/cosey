import { enhanceComponent, type EnhancedComponent } from '../utils';
import FormDrawer from './form-drawer';

export * from './form-drawer.api';

const _FormDrawer: EnhancedComponent<typeof FormDrawer> = enhanceComponent(FormDrawer);

export { _FormDrawer as FormDrawer };
export default _FormDrawer;
