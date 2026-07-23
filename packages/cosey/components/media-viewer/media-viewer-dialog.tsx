import { defineComponent, ref, Teleport } from 'vue';
import Mask from '../mask/mask';
import Close from '../close/close';
import { useZIndex } from 'element-plus';
import { mediaViewerDialogEmits, mediaViewerDialogProps } from './media-viewer-dialog.api';
import Transition from '../transition/transition';
import { ElFocusTrap } from 'element-plus/es/components/focus-trap/index.mjs';
import { createBem } from '../../utils';

export const MediaViewerDialog = defineComponent({
  name: 'CoMediaViewerDialog',
  props: mediaViewerDialogProps,
  emits: mediaViewerDialogEmits,
  setup(props, { emit, slots }) {
    const bem = createBem('media-viewer-dialog');

    const { nextZIndex } = useZIndex();

    const wrapper = ref<HTMLDivElement>();

    const zIndex = ref(nextZIndex());

    function onFocusoutPrevented(event: CustomEvent) {
      if (event.detail?.focusReason === 'pointer') {
        event.preventDefault();
      }
    }

    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        hide();
      }
    }

    function hide() {
      emit('close');
    }

    return () => {
      return (
        <Teleport to="body" disabled={!props.teleported}>
          <Transition name="fade" appear>
            <div ref="wrapper" tabindex={-1} class={bem.b()} style={{ zIndex: zIndex.value }}>
              <ElFocusTrap
                loop
                trapped
                focus-trap-el={wrapper.value}
                focus-start-el="container"
                onFocusout-prevented={onFocusoutPrevented}
                onRelease-requested={onCloseRequested}
              >
                <Mask onClick={() => props.hideOnClickModal && hide()} />

                <Close onClick={() => hide()} />

                <div class={bem.e('content')}>{slots.default?.()}</div>
              </ElFocusTrap>
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
