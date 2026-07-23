<template>
  <div>
    <el-button type="primary" @click="showNotice">显示更新通知</el-button>
    <el-button @click="hideNotice">隐藏更新通知</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useUpdateNotification } from 'cosey/components';

const { showNotice, hideNotice } = useUpdateNotification();
</script>
