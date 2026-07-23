import { enhanceComponent, type EnhancedComponent } from '../utils';
import CheckUpdates from './check-updates';

export * from './check-updates.api';

export * from './useUpdateNotification';
export * from './useCheckUpdateInterval';
export * from './utils';

const _CheckUpdates: EnhancedComponent<typeof CheckUpdates> = enhanceComponent(CheckUpdates);

export { _CheckUpdates as CheckUpdates };
export default _CheckUpdates;
