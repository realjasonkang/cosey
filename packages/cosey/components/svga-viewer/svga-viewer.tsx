import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { omit } from 'lodash-es';
import { Parser, Player } from 'svga';
import { svgaViewerEmits, svgaViewerProps, svgaViewerSlots } from './svga-viewer.api';
import { MediaViewerDialog } from '../media-viewer/media-viewer-dialog';
import { ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { getCssVar } from '../../utils';

export default defineComponent({
  name: 'CoSvgaViewer',
  props: svgaViewerProps,
  slots: svgaViewerSlots,
  emits: svgaViewerEmits,
  setup(props, { emit }) {
    const canvasRef = ref<HTMLCanvasElement>();

    const loading = ref(false);

    let player: Player | null = null;

    onMounted(async () => {
      try {
        loading.value = true;
        const parser = new Parser();
        const svga = await parser.load(props.src!);
        canvasRef.value!.width = svga.size.width;
        canvasRef.value!.height = svga.size.height;

        player = new Player(canvasRef.value!);
        await player.mount(svga);

        player.start();
      } finally {
        loading.value = false;
      }
    });

    onBeforeUnmount(() => {
      player?.destroy();
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
