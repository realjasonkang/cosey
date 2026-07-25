import { computed, defineComponent, mergeProps, ref } from 'vue';
import { mediaCardProps, mediaCardSlots } from './media-card.api';
import { getFileType, getBasename } from '../../utils';
import { ImageCard } from '../image-card';
import { VideoCard } from '../video-card';
import { AudioCard } from '../audio-card';
import { FileCard } from '../file-card';
import { SvgaCard } from '../svga-card';
import { PagCard } from '../pag-card';

export default defineComponent({
  name: 'CoMediaCard',
  inheritAttrs: false,
  props: mediaCardProps,
  slots: mediaCardSlots,
  setup(props, { attrs, slots, expose }) {
    const mediaRef = ref();

    const mergedName = computed(() => {
      return props.name || getBasename(String(props.src) || '');
    });

    const mergedProps = computed(() => {
      return mergeProps(props, attrs, {
        name: mergedName.value,
      });
    });

    const mergedType = computed(() => {
      return props.type || getFileType(String(props.src) || '');
    });

    expose({
      view() {
        mediaRef.value?.view();
      },
    });

    return () => {
      switch (mergedType.value) {
        case 'image':
          return <ImageCard {...mergedProps.value} ref={mediaRef} v-slots={slots} />;
        case 'video':
          return <VideoCard {...mergedProps.value} ref={mediaRef} />;
        case 'audio':
          return <AudioCard {...mergedProps.value} ref={mediaRef} />;
        case 'svga':
          return <SvgaCard {...mergedProps.value} ref={mediaRef} />;
        case 'pag':
          return <PagCard {...mergedProps.value} ref={mediaRef} />;
        default:
          return <FileCard {...mergedProps.value} />;
      }
    };
  },
});
