import { enhanceComponent, type EnhancedComponent } from '../utils';
import MediaCardGroup from './media-card-group';

export * from './media-card-group.api';

const _MediaCardGroup: EnhancedComponent<typeof MediaCardGroup> = enhanceComponent(MediaCardGroup);

export { _MediaCardGroup as MediaCardGroup };
export default _MediaCardGroup;
