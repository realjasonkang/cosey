<template>
  <ClientOnly>
    <ConfigProvider
      :locale="coseyZhCn"
      :theme="{
        token: {
          colorPrimary: '#1677ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        },
      }"
    >
      <CustomLayout />
    </ConfigProvider>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'cosey/components';
import coseyZhCn from 'cosey/locale/lang/zh-cn';

import CustomLayout from './custom-layout.vue';
</script>
