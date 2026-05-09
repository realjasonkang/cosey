# HorizontalTree 水平树

## 简介

用于渲染一颗展开的，最后一级水平排列的树，可以勾选节点。

## 代码演示

### 基础使用

基础使用

::: demo

horizontal-tree/basic

:::

## API

### HorizontalTreeProps

| 属性  | 描述         | 类型                       | 默认值 |
| ----- | ------------ | -------------------------- | ------ |
| data  | 树形结构数据 | Record<PropertyKey, any>[] | -      |
| props | 树节点的描述 | [Props](#props)            | -      |

### Props

| 属性     | 描述                                   | 类型                                                                                     | 默认值     |
| -------- | -------------------------------------- | ---------------------------------------------------------------------------------------- | ---------- |
| children | 指定选项的子选项为选项对象的某个属性值 | string                                                                                   | 'children' |
| label    | 指定节点标签为节点对象的某个属性值     | string                                                                                   | 'label'    |
| disabled | 指定选项的禁用为选项对象的某个属性值   | string \| ((data: Record<PropertyKey, any>[], node: Record<PropertyKey, any>) => string) | 'disabled' |
| class    | 指定节点类名为节点对象的某个属性值     | string \| ((data: Record<PropertyKey, any>[], node: Record<PropertyKey, any>) => string) | 'class'    |

### HorizontalTreeSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### HorizontalTreeEmits

| 事件         | 描述                     | 类型                                                  |
| ------------ | ------------------------ | ----------------------------------------------------- |
| check-change | 当复选框被点击的时候触发 | (node: ExtraTreeNode\<any>, checked: boolean) => void |

### HorizontalTreeExpose

| 属性                   | 描述                                       | 类型                                                             |
| ---------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| getCheckedNodes        | 返回当前选中节点的数组                     | () => Record<PropertyKey, any>[]                                 |
| setCheckedNodes        | 设置目前选中的节点                         | (nodes: Record<PropertyKey, any>[]) => void                      |
| getCheckedKeys         | 返回当前选中节点 key 的数组                | () => (string \| number)[]                                       |
| setCheckedKeys         | 设置目前选中的节点                         | (keys: (string \| number)[]) => void                             |
| setLeafOnlyCheckedKeys | 设置目前选中的叶子节点，非叶子节点会被忽略 | (keys: (string \| number)[]) => void                             |
| setChecked             | 设置节点是否被选中                         | (key: string \| number, checked: boolean) => void                |
| getHalfCheckedNodes    | 返回当前半选中的节点组成的数组             | () => Record<PropertyKey, any>[]                                 |
| getHalfCheckedKeys     | 返回目前半选中的节点的 key 所组成的数组    | () => (string \| number)[]                                       |
| getNode                | 根据 data 或者 key 拿到 Tree 组件中的 node | (key: string \| number) => Record<PropertyKey, any> \| undefined |
