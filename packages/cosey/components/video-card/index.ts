import { enhanceComponent, type EnhancedComponent } from '../utils';
import VideoCard from './video-card';

export * from './video-card.api';

const _VideoCard: EnhancedComponent<typeof VideoCard> = enhanceComponent(VideoCard);

export { _VideoCard as VideoCard };
export default _VideoCard;
