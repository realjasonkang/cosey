<template>
  <div :class="bem.b()">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutException',
});

const bem = createBem('layout-exception');
</script>
