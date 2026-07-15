import { enhanceComponent, type EnhancedComponent } from '../utils';
import AudioCard from './audio-card';

export * from './audio-card.api';

const _AudioCard: EnhancedComponent<typeof AudioCard> = enhanceComponent(AudioCard);

export { _AudioCard as AudioCard };
export default _AudioCard;
