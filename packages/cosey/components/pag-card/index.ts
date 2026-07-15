import { withInstall } from '../utils';
import PagCard from './pag-card';

export * from './pag-card.api';

const _PagCard = withInstall(PagCard);

export { _PagCard as PagCard };
export default _PagCard;
