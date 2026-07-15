import { enhanceComponent, type EnhancedComponent } from '../utils';
import ImageCard from './image-card';

export * from './image-card.api';

const _ImageCard: EnhancedComponent<typeof ImageCard> = enhanceComponent(ImageCard);

export { _ImageCard as ImageCard };
export default _ImageCard;
