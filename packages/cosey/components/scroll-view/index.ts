import { enhanceComponent, type EnhancedComponent } from '../utils';
import ScrollView from './scroll-view.vue';

export * from './scroll-view.api';

const _ScrollView: EnhancedComponent<typeof ScrollView> = enhanceComponent(ScrollView);

export { _ScrollView as ScrollView };
export default _ScrollView;
