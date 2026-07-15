import { enhanceComponent, type EnhancedComponent } from '../utils';
import NumberFormat from './number-format';

export * from './number-format.api';

const _NumberFormat: EnhancedComponent<typeof NumberFormat> = enhanceComponent(NumberFormat);

export { _NumberFormat as NumberFormat };
export default _NumberFormat;
