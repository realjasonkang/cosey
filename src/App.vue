<template>
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
      <router-view></router-view>
    </ElConfigProvider>
    <CheckUpdates />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { CheckUpdates, ConfigProvider } from 'cosey/components';
import { ElConfigProvider } from 'element-plus';
import { onMounted } from 'vue';

// 移除 index.html 的加载动画
onMounted(() => {
  const loading = document.querySelector('.launch');
  if (loading) {
    loading
      .animate(
        {
          opacity: 0,
        },
        {
          duration: 400,
        },
      )
      .addEventListener('finish', () => {
        loading.remove();
      });
  }
});
</script>
