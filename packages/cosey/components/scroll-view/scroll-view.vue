<template>
  <div
    ref="outer"
    :class="[bem.b(), bem.is('top', isTop), bem.is('bottom', isBottom)]"
    @pointerenter="onEnter"
  >
    <div ref="inner" :class="bem.e('inner')" :style="innerStyle" @scroll="onScroll">
      <slot></slot>
    </div>
    <div ref="track" :class="[bem.e('track'), bem.is('hide', hide)]" @pointerdown="onTrackDown">
      <div
        ref="thumb"
        :class="bem.e('thumb')"
        :style="thumbStyle"
        @pointerdown="onThumbDown"
        @pointermove="onThumbMove"
        @pointerup="onThumbUp"
        @pointercancel="onThumbUp"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { type ScrollViewProps, type ScrollViewSlots } from './scroll-view.api';
import { useResizeObserver } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoScrollView',
});

defineProps<ScrollViewProps>();

defineSlots<ScrollViewSlots>();

const bem = createBem('scroll-view');

const outerRef = useTemplateRef('outer');
const innerRef = useTemplateRef('inner');
const trackRef = useTemplateRef('track');
const thumbRef = useTemplateRef('thumb');

const height = ref(1);
const top = ref(0);
const hide = ref(false);

const thumbStyle = computed(() => {
  return {
    height: height.value + 'px',
    insetBlockStart: top.value + 'px',
  };
});

const isTop = ref(false);
const isBottom = ref(false);

const update = () => {
  const el = innerRef.value;

  if (el) {
    const clientHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;
    const scrollTop = el.scrollTop;

    height.value = (clientHeight / scrollHeight) * clientHeight;
    top.value = (scrollTop / scrollHeight) * clientHeight;
    hide.value = scrollHeight <= clientHeight;

    isTop.value = scrollTop === 0;
    isBottom.value = clientHeight + scrollTop >= scrollHeight;
  }
};

const onEnter = () => {
  update();
};

const onScroll = () => {
  update();
};

useResizeObserver(outerRef, () => {
  update();
});

let mutationObserver: MutationObserver;

onMounted(() => {
  mutationObserver = new MutationObserver(() => {
    update();
  });

  mutationObserver.observe(innerRef.value!, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

onBeforeUnmount(() => {
  mutationObserver.disconnect();
});

let isThumbDown = false;
let downY = 0;
let downScrollTop = 0;
let downScrollHeight = 0;
let downClientHeight = 0;
let downTop = 0;

const onThumbDown = (event: PointerEvent) => {
  isThumbDown = true;
  thumbRef.value?.setPointerCapture(event.pointerId);
  downY = event.clientY;

  const el = innerRef.value!;
  downScrollTop = el.scrollTop;
  downScrollHeight = el.scrollHeight;
  downClientHeight = el.clientHeight;

  downTop = (downScrollTop / downScrollHeight) * downClientHeight;
};

const onThumbMove = (event: PointerEvent) => {
  if (!isThumbDown) {
    return;
  }
  event.preventDefault();

  const offsetY = event.clientY - downY;

  const nextTop = downTop + offsetY;

  innerRef.value!.scrollTop = (nextTop / downClientHeight) * downScrollHeight;
};

const onThumbUp = (event: PointerEvent) => {
  if (!isThumbDown) {
    return;
  }
  isThumbDown = false;
  thumbRef.value?.releasePointerCapture(event.pointerId);
};

const onTrackDown = (event: MouseEvent) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  const rect = trackRef.value!.getBoundingClientRect();
  const percent = (event.clientY - rect.top) / rect.height;
  const el = innerRef.value!;
  innerRef.value!.scrollTop = (el.scrollHeight - el.clientHeight) * percent;
};
</script>
