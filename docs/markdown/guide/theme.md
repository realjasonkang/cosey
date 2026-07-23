# 主题

Cosey 提供了以设置组件属性的方式自定义主题。

可通过 `ConfigProvider` 组件 `theme` 属性设置主题色：

```vue
<ConfigProvider
  :theme="{
    token: {
      colorPrimary: '#0959C9',
      colorSuccess: '#3B960E',
      colorWarning: '#CD8C09',
      colorError: '#AB1415',
    },
  }"
>
  <router-view></router-view>
</ConfigProvider>
```

设置了主题色后，其梯度色会自动生成。
