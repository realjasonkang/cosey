import {
  type StackDialogExpose,
  stackDialogProps,
  useStackDialog,
  stackDialogSlots,
  stackDialogEmits,
} from './stack-dialog.api';
import { createMergedExpose, createBem } from '../../utils';
import { elFormDialogExposeKeys } from '../form-dialog';
import { defineComponent, ref } from 'vue';
import { ElDialog } from 'element-plus';
import classNames from 'classnames';

export default defineComponent({
  name: 'CoStackDialog',
  props: stackDialogProps,
  slots: stackDialogSlots,
  emits: stackDialogEmits,
  setup(props, { slots, emit, expose: _expose }) {
    const bem = createBem('stack-dialog');

    const elPopupRef = ref();

    const expose = createMergedExpose(elFormDialogExposeKeys, () => elPopupRef.value);

    _expose<StackDialogExpose>(expose);

    const { onShow, onHide, info } = useStackDialog();

    return () => {
      return (
        <ElDialog
          ref={elPopupRef}
          {...props}
          class={bem.b()}
          headerClass={classNames(props.headerClass, bem.e('header'))}
          bodyClass={classNames(props.bodyClass, bem.e('body'))}
          footerClass={classNames(props.footerClass, bem.e('footer'))}
          onUpdate:modelValue={(value) => emit('update:modelValue', value)}
          style={{ maxWidth: props.fullscreen ? null : 'calc(100vw - 32px)', ...info }}
          append-to-body={true}
          onOpen={() => {
            onShow();
            emit('open');
          }}
          onOpened={() => {
            onShow();
            emit('opened');
          }}
          onClose={() => {
            onHide();
            emit('close');
          }}
          onClosed={() => {
            onHide();
            emit('closed');
          }}
          v-slots={slots}
        />
      );
    };
  },
});
