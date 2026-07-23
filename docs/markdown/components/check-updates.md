# CheckUpdates 版本更新检测

## 简介

自动检测应用版本更新，当有新版本时弹出通知提醒用户刷新页面。每 60 秒轮询一次，页面隐藏时暂停检测。

## 代码演示

### 基础使用

通过 `useUpdateNotification` 可手动控制通知的显示与隐藏。

::: demo

check-updates/basic

:::

### 自动检测

将组件放置在 `ConfigProvider` 中即可自动轮询检测版本更新。

```vue
<ConfigProvider>
  <CheckUpdates />
</ConfigProvider>

<script setup lang="ts">
import { CheckUpdates, ConfigProvider } from 'cosey/components';
</script>
```

### 自定义检测逻辑

你也可以通过 `useUpdateNotification`、`useCheckUpdateInterval` 和 `getVersionTag` 组合自定义检测逻辑。

```vue
<template>
  <ElButton @click="showNotice">手动检查更新</ElButton>
</template>

<script setup lang="ts">
import { useUpdateNotification, useCheckUpdateInterval, getVersionTag } from 'cosey/components';

let lastVersionTag = '';

const { showNotice } = useUpdateNotification();

useCheckUpdateInterval(async () => {
  const versionTag = await getVersionTag();
  if (!versionTag) return;

  if (!lastVersionTag) {
    lastVersionTag = versionTag;
    return;
  }

  if (lastVersionTag !== versionTag) {
    lastVersionTag = versionTag;
    showNotice();
  }
});
</script>
```

## API

### CheckUpdates 组件

该组件为纯功能组件，自动轮询检测版本更新，无需传入任何属性，也没有对外暴露的事件。

### useUpdateNotification()

弹出更新通知弹窗的 composable。

| 返回值       | 类型         | 描述                                             |
| ------------ | ------------ | ------------------------------------------------ |
| `showNotice` | `() => void` | 显示版本更新通知弹窗。重复调用不会创建多个弹窗。 |
| `hideNotice` | `() => void` | 关闭版本更新通知弹窗。组件卸载时自动关闭。       |

### useCheckUpdateInterval(callback)

定时轮询的 composable，会处理页面可见性变化。

| 参数       | 类型         | 描述                                 |
| ---------- | ------------ | ------------------------------------ |
| `callback` | `() => void` | 定时执行的检测回调，每 60 秒执行一次 |

页面隐藏时暂停轮询，恢复可见时立即执行一次回调。

### getVersionTag()

| 返回值       | 类型             | 描述                                                                                              |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| `versionTag` | `string \| null` | 当前页面的版本标识（ETag 或 Last-Modified），获取失败返回 `null`。`localhost` 环境下返回 `null`。 |

### 工作原理

1. 向当前页面发送 `HEAD` 请求，通过 `ETag` 或 `Last-Modified` 响应头判断版本变化。
2. 首次加载记录当前版本标识，后续每 60 秒比对一次。
3. 检测到新版本时弹出通知，用户可选择立即刷新或稍后手动刷新。
4. 页面隐藏（切后台/切标签页）时暂停轮询，恢复可见时立即检测一次。
5. `localhost` / `127.0.0.1` 环境下不执行检测。
