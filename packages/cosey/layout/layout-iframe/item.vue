<template>
  <MergedLayoutSwitchEffect>
    <div v-show="name === layoutStore.activeTab" :class="bem.b()">
      <div v-loading="loading" :class="bem.e('loading')">
        <iframe :src="src" :class="bem.e('iframe')" @load="onLoad" />
      </div>
    </div>
  </MergedLayoutSwitchEffect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MergedLayoutSwitchEffect from '../merged/layout-switch-effect';
import { useLayoutStore } from '../../store';
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

const loading = ref(true);

const onLoad = () => {
  loading.value = false;
};
</script>
