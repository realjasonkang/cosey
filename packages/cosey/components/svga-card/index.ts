import { enhanceComponent, type EnhancedComponent } from '../utils';
import SvgaCard from './svga-card';

export * from './svga-card.api';

const _SvgaCard: EnhancedComponent<typeof SvgaCard> = enhanceComponent(SvgaCard);

export { _SvgaCard as SvgaCard };
export default _SvgaCard;
