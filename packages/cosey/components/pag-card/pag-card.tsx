import { defineComponent, ref } from 'vue';
import { useLockscreen } from 'element-plus';
import { pagCardProps, pagCardEmits } from './pag-card.api';
import { PagViewer } from '../pag-viewer';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoPagCard',
  inheritAttrs: false,
  props: pagCardProps,
  emits: pagCardEmits,
  setup(props, { attrs, emit, expose }) {
    const bem = createBem('pag-card');

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
            class={[bem.b(), bem.is(props.size)]}
            title={props.title || props.src}
            onClick={() => openViewer()}
          >
            <div class={bem.e('type')}>pag</div>
            <div class={bem.e('filename')}>{props.name}</div>
          </div>

          {viewerVisible.value && <PagViewer src={props.src} onClose={() => closeViewer()} />}
        </>
      );
    };
  },
});
