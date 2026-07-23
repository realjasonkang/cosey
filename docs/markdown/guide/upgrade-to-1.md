# 0.x.x 升级到 1.x.x

## 配置组件

1. 移除了 `RootConfigProvider` 组件，使用 `ConfigProvider` 组件代替，并且此组件只能在组件树根部使用一次，不可嵌套。

2. `ConfigProvider` 组件内部不再包含 `ElConfigProvider` 组件，需要手动声明：

```vue
<template>
  <ConfigProvider #default="{ locale }">
    <ElConfigProvider :locale="locale">
      <router-view></router-view>
    </ElConfigProvider>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'cosey/components';
import { ElConfigProvider } from 'element-plus';
</script>
```

## 导入样式文件

不再自动导入样式文件，需手动导入，包括 `element-plus` 和 `cosey`：

```scss
@use 'element-plus/dist/index.css' as *;
@use 'element-plus/theme-chalk/dark/css-vars.css' as *;
@use 'cosey/style/index.css' as *;
```

## 主题 token

弃用自定义主题 token，使用 `element-plus` 主题 token，如果有用到 `--co-` 前缀的变量，需从 `--el-` 中找到替代变量。
