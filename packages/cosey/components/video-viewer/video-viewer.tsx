import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { videoViewerProps, videoViewerSlots, videoViewerEmits } from './video-viewer.api';
import { MediaViewerDialog } from '../media-viewer';
import { omit } from 'lodash-es';

export default defineComponent({
  name: 'CoVideoViewer',
  props: videoViewerProps,
  slots: videoViewerSlots,
  emits: videoViewerEmits,
  setup(props, { emit }) {
    const videoRef = ref<HTMLVideoElement>();

    onMounted(() => {
      videoRef.value?.play();
    });

    onBeforeUnmount(() => {
      videoRef.value?.pause();
    });

    return () => {
      return (
        <MediaViewerDialog {...omit(props, 'src')} onClose={() => emit('close')}>
          <video
            ref={videoRef}
            controls
            src={props.src}
            style="width: 100%; height: 100%; background-color: black"
          ></video>
        </MediaViewerDialog>
      );
    };
  },
});
