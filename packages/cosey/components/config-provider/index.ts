import { enhanceComponent, type EnhancedComponent } from '../utils';
import ConfigProvider from './config-provider';

export * from './config-provider.api';

const _ConfigProvider: EnhancedComponent<typeof ConfigProvider> = enhanceComponent(ConfigProvider);

export { _ConfigProvider as ConfigProvider };
export default _ConfigProvider;
