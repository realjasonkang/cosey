import { enhanceComponent, type EnhancedComponent } from '../utils';
import MediaCard from './media-card';

export * from './media-card.api';

const _MediaCard: EnhancedComponent<typeof MediaCard> = enhanceComponent(MediaCard);

export { _MediaCard as MediaCard };
export default _MediaCard;
