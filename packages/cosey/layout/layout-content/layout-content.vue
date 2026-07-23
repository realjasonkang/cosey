<template>
  <div :class="bem.b()" :style="contentStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useLayoutStore } from '../../store';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutContent',
});

const bem = createBem('layout-content');

const layoutStore = useLayoutStore();

const contentStyle = computed(() => {
  return {
    marginInlineStart: layoutStore.sidebarWidth + 'px',
  };
});
</script>
