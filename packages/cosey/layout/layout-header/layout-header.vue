<template>
  <div :class="bem.b()" :style="headerStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useLockscreenObserver } from '../../hooks';
import { useLayoutStore } from '../../store';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutHeader',
});

const bem = createBem('layout-header');

const layoutStore = useLayoutStore();

const locked = useLockscreenObserver();

const headerStyle = computed(() => {
  const insetInlineStart = layoutStore.includeHorizontal ? 0 : layoutStore.sidebarWidth + 'px';

  const paddingInlineEnd = locked.value ? window.innerWidth - document.body.offsetWidth + 'px' : 0;

  return { insetInlineStart, paddingInlineEnd };
});
</script>
