import { enhanceComponent, type EnhancedComponent } from '../utils';
import InputNumberRange from './input-number-range';

export * from './input-number-range.api';

const _InputNumberRange: EnhancedComponent<typeof InputNumberRange> =
  enhanceComponent(InputNumberRange);

export { _InputNumberRange as InputNumberRange };
export default _InputNumberRange;
