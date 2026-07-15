import { defineComponent, ref } from 'vue';
import { useLockscreen } from 'element-plus';
import { pagCardProps, pagCardEmits } from './pag-card.api';
import PagViewer from '../pag-viewer/pag-viewer';
import useStyle from './pag-card.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoPagCard',
  inheritAttrs: false,
  props: pagCardProps,
  emits: pagCardEmits,
  setup(props, { attrs, emit, expose }) {
    const { prefixCls } = useComponentConfig('pag-card', props);

    const { hashId } = useStyle(prefixCls);

    const viewerVisible = ref(false);

    useLockscreen(viewerVisible);

    const openViewer = () => {
      viewerVisible.value = true;
      emit('open');
    };

    function closeViewer() {
      viewerVisible.value = false;
      emit('close');
    }

    expose({
      view() {
        openViewer();
      },
    });

    return () => {
      return (
        <>
          <div
            {...attrs}
            class={[hashId.value, prefixCls.value, `is-${props.size}`]}
            title={props.title || props.src}
            onClick={() => openViewer()}
          >
            <div class={`${prefixCls.value}-type`}>pag</div>
            <div class={`${prefixCls.value}-filename`}>{props.name}</div>
          </div>

          {viewerVisible.value && <PagViewer src={props.src} onClose={() => closeViewer()} />}
        </>
      );
    };
  },
});
