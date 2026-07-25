import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { audioViewerEmits, audioViewerProps, audioViewerSlots } from './audio-viewer.api';
import { MediaViewerDialog } from '../media-viewer';
import { omit } from 'lodash-es';

export default defineComponent({
  name: 'CoAudioViewer',
  props: audioViewerProps,
  slots: audioViewerSlots,
  emits: audioViewerEmits,
  setup(props, { emit }) {
    const audioRef = ref<HTMLAudioElement>();

    onMounted(() => {
      audioRef.value?.play();
    });

    onBeforeUnmount(() => {
      audioRef.value?.pause();
    });

    return () => {
      return (
        <MediaViewerDialog {...omit(props, 'src')} onClose={() => emit('close')}>
          <audio ref={audioRef} controls src={props.src}></audio>
        </MediaViewerDialog>
      );
    };
  },
});
