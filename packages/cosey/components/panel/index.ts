import { enhanceComponent, type EnhancedComponent } from '../utils';
import Panel from './panel';

export * from './panel.api';

const _Panel: EnhancedComponent<typeof Panel> = enhanceComponent(Panel);

export { _Panel as Panel };
export default _Panel;
