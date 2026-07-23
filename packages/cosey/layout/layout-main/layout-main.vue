<template>
  <div :class="bem.b()" :style="mainStyle">
    <MergedLayoutIframe />
    <router-view v-slot="{ Component, route }">
      <MergedLayoutSwitchEffect>
        <keep-alive :include="layoutStore.keepAliveInclude" :exclude="layoutStore.keepAliveExclude">
          <component v-if="!layoutStore.refreshing" :is="Component" :key="route.path" />
        </keep-alive>
      </MergedLayoutSwitchEffect>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MergedLayoutIframe from '../merged/layout-iframe';
import MergedLayoutSwitchEffect from '../merged/layout-switch-effect';
import { useLayoutStore } from '../../store';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutMain',
});

const bem = createBem('layout-main');

const layoutStore = useLayoutStore();

const mainStyle = computed(() => {
  return {
    marginBlockStart: layoutStore.headerHeight + 'px',
  };
});
</script>
