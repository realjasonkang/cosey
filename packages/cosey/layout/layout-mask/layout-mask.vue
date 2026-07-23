<template>
  <InternalTransition name="fade">
    <div
      v-show="layoutStore.sidebarVisible"
      :class="bem.b()"
      @click="layoutStore.sidebarVisible = false"
    ></div>
  </InternalTransition>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../store';
import { Transition as InternalTransition } from '../../components';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutMask',
});

const bem = createBem('layout-mask');

const layoutStore = useLayoutStore();
</script>
