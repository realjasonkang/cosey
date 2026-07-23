<template>
  <div ref="sidebar" :class="bem.b()" :style="sidebarStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
import { useLayoutStore } from '../../store';
import { useDir } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutSidebar',
});

const bem = createBem('layout-sidebar');

const layoutStore = useLayoutStore();

const sidebarRef = useTemplateRef('sidebar');

const dir = useDir(sidebarRef);

const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});

const sidebarStyle = computed(() => {
  const marginBlockStart =
    layoutStore.isMobile || !layoutStore.includeHorizontal ? 0 : layoutStore.topbarHeight;

  return {
    marginBlockStart: marginBlockStart + 'px',
    height: `calc(100vh - ${marginBlockStart}px)`,
    transform: !layoutStore.sidebarVisible
      ? `translateX(${dir.value === 'ltr' ? '-100%' : '100%'})`
      : undefined,
    transition: isMounted.value ? undefined : 'none',
  };
});
</script>
