import { defineComponent, ref, Teleport } from 'vue';
import Mask from '../mask/mask';
import Close from '../close/close';
import { useComponentConfig } from '../config-provider';
import useStyle from './media-viewer-dialog.style';
import { useZIndex } from 'element-plus';
import { mediaViewerDialogEmits, mediaViewerDialogProps } from './media-viewer-dialog.api';
import Transition from '../transition/transition';
import { ElFocusTrap } from 'element-plus/es/components/focus-trap/index.mjs';

export const MediaViewerDialog = defineComponent({
  name: 'CoMediaViewerDialog',
  props: mediaViewerDialogProps,
  emits: mediaViewerDialogEmits,
  setup(props, { emit, slots }) {
    const { prefixCls } = useComponentConfig('media-viewer-dialog', props);

    const { hashId } = useStyle(prefixCls);

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
            <div
              ref="wrapper"
              tabindex={-1}
              class={[hashId.value, prefixCls.value]}
              style={{ zIndex: zIndex.value }}
            >
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

                <div class={`${prefixCls.value}-content`}>{slots.default?.()}</div>
              </ElFocusTrap>
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
