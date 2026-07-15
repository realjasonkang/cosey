import { enhanceComponent, type EnhancedComponent } from '../utils';
import OptionalWrapper from './optional-wrapper';

const _OptionalWrapper: EnhancedComponent<typeof OptionalWrapper> =
  enhanceComponent(OptionalWrapper);

export { _OptionalWrapper as OptionalWrapper };
export default _OptionalWrapper;
