import { Component } from 'vue';
import { enhanceComponent, type EnhancedComponent } from '../utils';
import FormDialog from './form-dialog';
import { useFormDialogWidth } from './useFormDialogWidth';
import { FormDialogProps } from './form-dialog.api';

export * from './form-dialog.api';

const _FormDialog: Component<FormDialogProps> & EnhancedComponent<typeof FormDialog> =
  enhanceComponent(FormDialog);

export { _FormDialog as FormDialog, useFormDialogWidth };
export default _FormDialog;
