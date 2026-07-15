import { enhanceComponent, type EnhancedComponent } from '../utils';
import StackDialog from './stack-dialog';

export * from './stack-dialog.api';

const _StackDialog: EnhancedComponent<typeof StackDialog> = enhanceComponent(StackDialog);

export { _StackDialog as StackDialog };
export default _StackDialog;
