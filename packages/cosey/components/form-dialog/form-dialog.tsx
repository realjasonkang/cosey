import {
  type FormDialogExpose,
  formDialogProps,
  elFormDialogExposeKeys,
  formDialogSlots,
  formDialogEmits,
} from './form-dialog.api';
import { useBubbleTemplate } from '../form';
import { computed, defineComponent, h } from 'vue';
import { useFormDialogWidth } from './useFormDialogWidth';
import { ElDialog } from 'element-plus';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoFormDialog',
  props: formDialogProps,
  slots: formDialogSlots,
  emits: formDialogEmits,
  setup(props, { emit, slots, expose: _expose }) {
    const bem = createBem('form-dialog');

    const { visible, handleOpen, handleClosed, expose, buttonTemplate, elPopupRef } =
      useBubbleTemplate({
        props,
        emit,
        slots,
        exposeKeys: elFormDialogExposeKeys,
      });

    const width = useFormDialogWidth(computed(() => props.width));

    _expose<FormDialogExpose>(expose);

    return () => {
      return (
        <ElDialog
          ref={elPopupRef}
          {...props}
          class={bem.b()}
          v-model={visible.value}
          style={{ maxWidth: props.fullscreen ? null : 'calc(100vw - 32px)' }}
          width={width.value}
          append-to-body={true}
          onOpen={handleOpen}
          onClosed={handleClosed}
          v-slots={{
            ...slots,
            footer: () => {
              return slots.footer ? slots.footer({}) : h(buttonTemplate);
            },
          }}
        ></ElDialog>
      );
    };
  },
});
