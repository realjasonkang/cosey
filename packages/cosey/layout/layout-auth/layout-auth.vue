<template>
  <div :class="bem.b()">
    <div :class="bem.e('bg')"></div>
    <div :class="bem.e('main')">
      <router-view></router-view>
    </div>

    <div :class="bem.e('brand')">
      <MergedLayoutBrand />
    </div>

    <div :class="bem.e('widget')">
      <component :is="AuthWidget" />
      <MergedLayoutLocale />
      <MergedLayoutColorScheme />
    </div>
  </div>
</template>

<script setup lang="ts">
import MergedLayoutColorScheme from '../merged/layout-color-scheme';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutLocale from '../merged/layout-locale';
import { defineTemplate } from '../../utils';
import { useGlobalConfig } from '../../config';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutAuth',
});

const bem = createBem('layout-auth');

const slotsConfig = useGlobalConfig().slots;
const AuthWidget = defineTemplate(() => slotsConfig.authWidget?.());
</script>
