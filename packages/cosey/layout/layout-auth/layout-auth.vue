<template>
  <div :class="bem.b()">
    <div :class="bem.e('bg')"></div>
    <div :class="bem.e('main')">
      <router-view></router-view>
    </div>

    <div :class="bem.e('brand')">
      <component :is="BrandComp" />
    </div>

    <div :class="bem.e('widget')">
      <component :is="AuthWidget" />
      <component :is="LocaleComp" />
      <component :is="ColorSchemeComp" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutColorScheme from '../layout-color-scheme/layout-color-scheme.vue';
import LayoutBrand from '../layout-brand/layout-brand.vue';
import LayoutLocale from '../layout-locale/layout-locale.vue';
import { defineTemplate } from '../../utils';
import { useGlobalConfig } from '../../config';
import { useOptionalComponent } from '../../hooks';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutAuth',
});

const bem = createBem('layout-auth');

const { components, slots: slotsConfig } = useGlobalConfig();
const BrandComp = useOptionalComponent(() => components?.brand, LayoutBrand);
const ColorSchemeComp = useOptionalComponent(() => components?.colorScheme, LayoutColorScheme);
const LocaleComp = useOptionalComponent(() => components?.locale, LayoutLocale);
const AuthWidget = defineTemplate(() => slotsConfig.authWidget?.());
</script>
