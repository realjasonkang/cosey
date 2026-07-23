<template>
  <div
    :class="[bem.b(), bem.is('hide', layoutStore.snugMenus.length === 0)]"
    :style="snugAsideStyle"
  >
    <div
      v-if="!layoutStore.includeHorizontal"
      :style="{ height: `${layoutStore.topbarHeight - 1}px` }"
      :class="bem.e('header')"
    >
      <MergedLayoutBrand hide-name />
    </div>
    <el-scrollbar :class="bem.e('body')">
      <MergedLayoutSnugMenu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutSnugMenu from '../merged/layout-snug-menu';
import { useLayoutStore } from '../../store';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutSnugAside',
});

const bem = createBem('layout-snug-aside');

const layoutStore = useLayoutStore();

const snugAsideStyle = computed(() => {
  return {
    width: (layoutStore.snugMenus.length === 0 ? 0 : layoutStore.snugAsideWidth) + 'px',
  };
});
</script>
