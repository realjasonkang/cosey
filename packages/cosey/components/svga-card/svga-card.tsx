import { defineComponent, ref } from 'vue';
import { useLockscreen } from 'element-plus';
import { svgaCardProps, svgaCardEmits } from './svga-card.api';
import SvgaViewer from '../svga-viewer/svga-viewer';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoSvgaCard',
  inheritAttrs: false,
  props: svgaCardProps,
  emits: svgaCardEmits,
  setup(props, { attrs, emit, expose }) {
    const bem = createBem('svga-card');

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
            <div class={bem.e('type')}>svga</div>
            <div class={bem.e('filename')}>{props.name}</div>
          </div>

          {viewerVisible.value && <SvgaViewer src={props.src} onClose={() => closeViewer()} />}
        </>
      );
    };
  },
});
