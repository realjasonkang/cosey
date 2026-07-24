<template>
  <ClientOnly>
    <ConfigProvider
      :theme="{
        token: {
          colorPrimary: '#1677ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        },
      }"
      #default="{ locale }"
    >
      <ElConfigProvider :locale="locale">
        <CustomLayout />
      </ElConfigProvider>
    </ConfigProvider>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'cosey/components';
// import coseyZhCn from 'cosey/locale/lang/zh-cn';

import CustomLayout from './custom-layout.vue';
</script>
