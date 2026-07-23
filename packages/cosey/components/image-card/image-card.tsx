import { computed, defineComponent, mergeProps, ref } from 'vue';
import { ElImage, useLockscreen } from 'element-plus';
import {
  type ImageCardExpose,
  imageCardSlots,
  imageCardEmits,
  imageCardProps,
} from './image-card.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoImageCard',
  props: imageCardProps,
  emits: imageCardEmits,
  slots: imageCardSlots,
  setup(props, { slots, expose }) {
    const bem = createBem('image-card');

    const imageRef = ref();

    const mergedPreviewSrcList = computed(() => {
      return props.srcList?.length
        ? props.srcList
        : props.previewSrcList?.length
          ? props.previewSrcList
          : props.src
            ? [props.src]
            : [];
    });

    expose<ImageCardExpose>({
      view() {
        imageRef.value?.$el.querySelector('img').click();
      },
    });

    const viewerVisible = ref(false);

    const onShow = () => {
      viewerVisible.value = true;
    };

    const onClose = () => {
      viewerVisible.value = false;
    };

    // 修复 ElImage 显隐页面晃动缺陷
    useLockscreen(viewerVisible);

    const mergedProps = computed(() => {
      return mergeProps(props, {
        title: props.title || props.src,
        class: [bem.b(), bem.is(props.size)],
        previewSrcList: mergedPreviewSrcList.value,
        previewTeleported: true,
        onShow,
        onClose,
        ref: imageRef,
        initialIndex: Math.max(mergedPreviewSrcList.value.indexOf(props.src!), 0),
      });
    });

    return () => {
      return <ElImage {...mergedProps.value} v-slots={slots} />;
    };
  },
});
