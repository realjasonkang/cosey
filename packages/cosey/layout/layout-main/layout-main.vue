<template>
  <div :class="bem.b()" :style="mainStyle">
    <component :is="IframeComp" />
    <router-view v-slot="{ Component, route }">
      <component :is="SwitchEffectComp">
        <keep-alive :include="layoutStore.keepAliveInclude" :exclude="layoutStore.keepAliveExclude">
          <component v-if="!layoutStore.refreshing" :is="Component" :key="route.path" />
        </keep-alive>
      </component>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LayoutIframe from '../layout-iframe/layout-iframe.vue';
import LayoutSwitchEffect from '../layout-switch-effect/layout-switch-effect.vue';
import { useLayoutStore } from '../../store';
import { useGlobalConfig } from '../../config';
import { useOptionalComponent } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutMain',
});

const bem = createBem('layout-main');

const layoutStore = useLayoutStore();

const { components } = useGlobalConfig();
const IframeComp = useOptionalComponent(() => components?.iframe, LayoutIframe);
const SwitchEffectComp = useOptionalComponent(() => components?.switchEffect, LayoutSwitchEffect);

const mainStyle = computed(() => {
  return {
    marginBlockStart: layoutStore.headerHeight + 'px',
  };
});
</script>
