import { enhanceComponent, type EnhancedComponent } from '../utils';
import Card from './card';

export * from './card.api';

const _Card: EnhancedComponent<typeof Card> = enhanceComponent(Card);

export { _Card as Card };
export default _Card;
