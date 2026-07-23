<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/icons.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';

import './styles/vp-doc.scss';
import './styles/override-vite-press.scss';

import { useData } from 'vitepress';
import { useColorScheme } from 'cosey/hooks';
import { watch } from 'vue';

const { isDark } = useData();

const { colorScheme } = useColorScheme();

watch(isDark, () => {
  colorScheme.value = isDark.value ? 'dark' : 'light';
});
</script>
