import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { omit } from 'lodash-es';
import { PAGView, PAGFile, types, View } from '@gunny/libpag-lite';
import { pagViewerEmits, pagViewerProps, pagViewerSlots } from './pag-viewer.api';
import { MediaViewerDialog } from '../media-viewer';
import { ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { getCssVar } from '../../utils';

export default defineComponent({
  name: 'CoPagViewer',
  props: pagViewerProps,
  slots: pagViewerSlots,
  emits: pagViewerEmits,
  setup(props, { emit }) {
    const canvasRef = ref<HTMLCanvasElement>();

    const loading = ref(false);

    let pagView: View | null = null;

    onMounted(async () => {
      try {
        loading.value = true;

        const arrayBuffer = await fetch(props.src!).then((res) => res.arrayBuffer());
        const pagFile = PAGFile.fromArrayBuffer(arrayBuffer);
        const canvas = canvasRef.value!;
        canvas.width = pagFile.mainComposition.width;
        canvas.height = pagFile.mainComposition.height;
        pagView = PAGView.init(arrayBuffer, canvas, {
          renderingMode: types.RenderingMode.WebGL,
        });
        pagView.play();
      } finally {
        loading.value = false;
      }
    });

    onBeforeUnmount(() => {
      pagView?.destroy();
    });

    return () => {
      return (
        <MediaViewerDialog {...omit(props, 'src')} onClose={() => emit('close')}>
          <ElIcon
            v-show={loading.value}
            class="is-loading"
            color={getCssVar('color-white')}
            size={getCssVar('size-xl')}
          >
            <Loading />
          </ElIcon>
          <canvas v-show={!loading.value} ref={canvasRef}></canvas>
        </MediaViewerDialog>
      );
    };
  },
});
