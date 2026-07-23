<template>
  <div :style="{ height: `${layoutStore.topbarHeight}px` }" :class="bem.b()">
    <div :class="bem.e('left')">
      <slot name="left"></slot>
    </div>
    <el-scrollbar
      :class="bem.e('right')"
      :wrap-class="bem.e('right-wrap')"
      :view-class="bem.e('right-view')"
    >
      <slot name="right"></slot>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../store';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutTopbar',
});

const bem = createBem('layout-topbar');

const layoutStore = useLayoutStore();
</script>
