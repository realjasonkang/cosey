<template>
  <div :class="[bem.b(), bem.is('horizontal', isHorizontal)]">
    <img v-if="!hideLogo" :src="siteConfig.logo" :class="bem.e('logo')" />
    <span v-if="!hideName" :class="bem.e('name')">
      {{ siteConfig.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useGlobalConfig } from '../../config';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutBrand',
});

defineProps<{
  hideName?: boolean;
  hideLogo?: boolean;
  isHorizontal?: boolean;
}>();

const bem = createBem('layout-brand');

const siteConfig = useGlobalConfig().site;
</script>
