<template>
  <component ref="row" :is="tag" :class="bem.b()" :style="rowStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '../../hooks';
import {
  type RowSlots,
  type RowProps,
  type RowEmits,
  type RowContext,
  type RowSize,
  defaultRowProps,
  rowContextSymbol,
  generateAlgorithms,
} from './row';
import {
  computed,
  provide,
  reactive,
  ref,
  toRef,
  useTemplateRef,
  watch,
  type CSSProperties,
} from 'vue';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoRow',
});

const props = withDefaults(defineProps<RowProps>(), defaultRowProps);

defineSlots<RowSlots>();

const emit = defineEmits<RowEmits>();

const bem = createBem('row');

const currentSize = ref<RowSize>('xs');

const algorithms = computed(() => generateAlgorithms(props.breakpoints));

const rowRef = useTemplateRef('row');

useResizeObserver(rowRef, ({ inlineSize }) => {
  for (const [size, algorithm] of algorithms.value) {
    if (algorithm(inlineSize)) {
      currentSize.value = size;
      return;
    }
  }
});

watch(currentSize, () => {
  emit('size-change', currentSize.value);
});

const rowStyle = computed(() => {
  const styles: CSSProperties = {
    justifyContent: props.justify,
    alignItems: props.align,
  };
  if (!props.gutter) {
    return styles;
  }

  styles.marginInlineEnd = styles.marginInlineStart = `-${props.gutter / 2}px`;
  return styles;
});

provide<RowContext>(
  rowContextSymbol,
  reactive({
    gutter: toRef(() => props.gutter),
    currentSize,
  }),
);
</script>
