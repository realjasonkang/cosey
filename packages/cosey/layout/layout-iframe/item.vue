<template>
  <component :is="SwitchEffectComp">
    <div v-show="name === layoutStore.activeTab" :class="bem.b()">
      <div v-loading="loading" :class="bem.e('loading')">
        <iframe :src="src" :class="bem.e('iframe')" @load="onLoad" />
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LayoutSwitchEffect from '../layout-switch-effect/layout-switch-effect.vue';
import { useLayoutStore } from '../../store';
import { useGlobalConfig } from '../../config';
import { useOptionalComponent } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutIframeItem',
});

defineProps<{
  name: string;
  src: string;
}>();

const bem = createBem('layout-iframe');

const layoutStore = useLayoutStore();

const { components } = useGlobalConfig();
const SwitchEffectComp = useOptionalComponent(() => components?.switchEffect, LayoutSwitchEffect);

const loading = ref(true);

const onLoad = () => {
  loading.value = false;
};
</script>
