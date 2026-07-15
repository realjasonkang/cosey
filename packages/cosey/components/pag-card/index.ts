import { enhanceComponent, type EnhancedComponent } from '../utils';
import PagCard from './pag-card';

export * from './pag-card.api';

const _PagCard: EnhancedComponent<typeof PagCard> = enhanceComponent(PagCard);

export { _PagCard as PagCard };
export default _PagCard;
