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
      <component :is="BrandComp" hide-name />
    </div>
    <el-scrollbar :class="bem.e('body')">
      <component :is="SnugMenuComp" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import LayoutBrand from '../layout-brand/layout-brand.vue';
import LayoutSnugMenu from '../layout-snug-menu/layout-snug-menu.vue';
import { useLayoutStore } from '../../store';
import { useGlobalConfig } from '../../config';
import { useOptionalComponent } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutSnugAside',
});

const bem = createBem('layout-snug-aside');

const layoutStore = useLayoutStore();

const { components } = useGlobalConfig();
const BrandComp = useOptionalComponent(() => components?.brand, LayoutBrand);
const SnugMenuComp = useOptionalComponent(() => components?.snugMenu, LayoutSnugMenu);

const snugAsideStyle = computed(() => {
  return {
    width: (layoutStore.snugMenus.length === 0 ? 0 : layoutStore.snugAsideWidth) + 'px',
  };
});
</script>
