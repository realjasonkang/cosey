# Table 表格

## 简介

在ElTable基础上，新增分页、查询表单、工具栏等功能，预设了默认的使用方式，简化样板代码。

## 代码演示

### 基础使用

要建立一个增删改查表格，可通过以下步骤：

- 首先在 `ConfigProvider` 中配置全局列表接口结构；
- 使用 `useTable` 配置表格属性，简化表格组件方法的调用；
- 使用 `columns` 属性配置表格列；
- 使用 `actionColumn` 属性配置操作列；
- 使用 `formProps` 属性配置查询表单；
- 使用 `api` 属性建立与服务器的联系；
- 使用对话框等组件创建“新增/编辑”表单。

::: demo

table/basic

:::

## API

### TableProps

继承 `element-plus` 的 [Table 属性](https://element-plus.org/zh-CN/component/table#table-%E5%B1%9E%E6%80%A7) 并有以下属性：

| 属性               | 描述                                                                        | 类型                                                                                                 | 默认值                     |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- |
| api                | 请求数据的函数                                                              | (...args: any[]) => Promise\<any>                                                                    | -                          |
| immediate          | 是否在挂载后立即请求数据                                                    | boolean                                                                                              | true                       |
| columns            | 定义表格列                                                                  | [TableColumnProps](#tablecolumnprops)[]                                                              | []                         |
| action-column      | 定义表格操作列                                                              | [TableColumnProps](#tablecolumnprops)                                                                | -                          |
| pagination         | 设置分页属性或隐藏分页组件                                                  | boolean \| [PaginationProps](https://element-plus.org/zh-CN/component/pagination#%E5%B1%9E%E6%80%A7) | true                       |
| get-expose         | 获取 `TableExpose`，会在组件创建后调用                                      | (expose: TableExpose) => void                                                                        | -                          |
| form-props         | 自定义查询表单属性                                                          | [TableQueryProps](#tablequeryprops)                                                                  | -                          |
| transform-params   | 请求之前对参数进行处理                                                      | (params: Record<string, any>) => any                                                                 | -                          |
| transform-response | 请求之后对返回值进行处理                                                    | (res: any) => any                                                                                    | -                          |
| parallel-fetch     | 会和 `api` 同时请求，并接收相同的参数，并影响加载状态。常用于获取统计数据。 | (...args: any[]) => Promise\<any> \| any                                                             | -                          |
| toolbar-config     | 设置工具栏按钮                                                              | [ToolbarConfig](#toolbarconfig) \| boolean                                                           | -                          |
| keys               | 定义接口相关的键名                                                          | [TableConfig](#tableconfig)['keys']                                                                  | defaultTableConfig['keys'] |
| stats-columns      | 定义统计列                                                                  | MaybeRef\<[TableStatisticsColumn](#tablestatisticscolumn)[]>                                         | -                          |
| stats-data         | 统计数据                                                                    | MaybeRef\<Record<string, any>>                                                                       | -                          |
| summary-properties | 设置默认合计时仅展示指定列数据                                              | string[]                                                                                             | -                          |
| transform-summary  | 转换合计列数据                                                              | (sums: any[]) => any[]                                                                               | -                          |
| split              | 分隔表格主体和头部等，显示分隔条                                            | boolean                                                                                              | false                      |

### TableQueryProps

继承 [FormQueryProps](./form-query) 并有以下额外属性：

| 属性    | 描述           | 类型                                    | 默认值 |
| ------- | -------------- | --------------------------------------- | ------ |
| schemes | 请求数据的函数 | [TableQueryScheme](#tablequeryscheme)[] | []     |

### TableQueryScheme

```ts
type TableQueryScheme = FormItemProps<FieldType> & {
  render?: (params: { model: Record<string, any> }) => VNodeChild;
  slots?: Record<string, unknown>;
};
```

### TableConfig

```ts
interface TableConfig {
  keys?: {
    list?: string;
    total?: string;
    page?: string;
    pageSize?: string;
    orderBy?: string;
    orderType?: string;
    asc?: string;
    desc?: string;
  };
}
```

### defaultTableConfig

```ts
const defaultTableConfig = {
  keys: {
    /**
     * 响应数据对象中“列表数据”的 key
     */
    list: 'list',

    /**
     * 响应数据对象中“总记录数”的 key
     */
    total: 'total',

    /**
     * 请求url查询参数中“当前页数”的参数名
     */
    page: 'page',

    /**
     * 请求url查询参数中“每页条数”的参数名
     */
    pageSize: 'pageSize',

    /**
     * 请求url查询参数中“排序列”的参数名
     */
    orderBy: 'orderBy',

    /**
     * 请求url查询参数中“排序方向”的参数名
     */
    orderType: 'orderType',

    /**
     * 排序方向中“升序”的值
     */
    asc: 'asc',

    /**
     * 排序方向中“降序”的值
     */
    desc: 'desc',
  },
};
```

### ToolbarConfig

| 属性       | 描述               | 类型    | 默认值 |
| ---------- | ------------------ | ------- | ------ |
| reload     | 是否显示重载按钮   | boolean | true   |
| export     | 是否显示导出按钮   | boolean | true   |
| fullScreen | 是否显示全屏按钮   | boolean | true   |
| setting    | 是否显示列设置按钮 | boolean | true   |

### TableStatisticsColumn

| 属性   | 描述                        | 类型                |
| ------ | --------------------------- | ------------------- |
| label  | 显示的标题                  | VNodeChild          |
| prop   | 字段名称 对应列内容的字段名 | string              |
| format | 用来格式化内容              | (value: any) => any |

### TableSlots

继承 `element-plus` 的 [Table 插槽](https://element-plus.org/zh-CN/component/table#table-%E6%8F%92%E6%A7%BD) 和以下插槽，并能定义 `TableColumnProps["slots"]` 中同名的插槽。

| 插槽               | 描述                                           | 属性 |
| ------------------ | ---------------------------------------------- | ---- |
| toolbar-left       | 自定义工具栏左边的内容                         | -    |
| toolbar-right      | 自定义工具栏右边的内容                         | -    |
| before-body        | 自定义主体前面内容（工具栏上面）               | -    |
| before-body-plain  | 自定义主体前面内容（工具栏上面），没有包裹容器 | -    |
| before-table       | 自定义表格前面内容（工具栏下面）               | -    |
| before-table-plain | 自定义表格前面内容（工具栏下面），没有包裹容器 | -    |

### TableEmits

继承 `element-plus` 的 [Table 事件](https://element-plus.org/zh-CN/component/table#table-%E4%BA%8B%E4%BB%B6)。

### TableExpose

继承 `element-plus` 的 [Table Exposes](https://element-plus.org/zh-CN/component/table#table-exposes) ，以及 [FormQueryExpose](./form-query#formqueryprops)，并支持以下属性。

| 属性               | 描述                           | 类型                                                  |
| ------------------ | ------------------------------ | ----------------------------------------------------- |
| reload             | 刷新表格数据                   | () => void                                            |
| expandAll          | 展开所有                       | () => void                                            |
| collapseAll        | 折叠所有                       | () => void                                            |
| getFetchParams     | 获取接口请求参数               | () => Record<string, any>                             |
| getFullFetchParams | 获取接口所有请求参数，包括分页 | () => Record<string, any>                             |
| setData            | 设置表格数据                   | (data: any[]) => void                                 |
| getData            | 获取表格数据                   | () => any[]                                           |
| getRootEl          | 获取根元素                     | () => HTMLElement \| null                             |
| getPagination      | 获取分页数据                   | () => \{ page: number; pageSize: number; }            |
| reset              | 重置表单                       | (values?: Record<PropertyKey, any>) => Promise\<void> |

### TableColumnProps

继承 `element-plus` 的 [Table-column 属性](https://element-plus.org/zh-CN/component/table#table-column-%E5%B1%9E%E6%80%A7)，并支持以下属性。

| 属性     | 描述                   | 类型                                                                                       | 默认值 |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------ | ------ |
| slots    | 定义插槽或声明插槽名称 | TableColumnPropsSlots                                                                      | -      |
| renderer | 使用内置渲染器进行渲染 | RendererType                                                                               | 'text' |
| hidden   | 是否隐藏当前列         | boolean                                                                                    | false  |
| columns  | 定义嵌套的表格列       | TableColumnProps[]                                                                         | -      |
| tooltip  | 设置列头提示框         | string                                                                                     | -      |
| format   | 格式化数据             | (cellValue: any, row: any, column: TableColumnCtx\<any>, index: number) => VNode \| string | -      |

### TableColumnPropsSlots

当值设置为非对象时，表示设置默认插槽。各个插槽的值可以是字符串或函数，如果是字符串，则从 `TableSlots` 中匹配对应的插槽内容。

```ts
type TableColumnPropsSlots =
  | string
  | ((props: { row: any; column: any; $index: number }) => any)
  | {
      default?: string | ((props: { row: any; column: any; $index: number }) => any);
      header?: string | ((props: { column: any; $index: number }) => any);
      filterIcon?: string | ((props: { filterOpened: boolean }) => any);
    };
```

### RendererType

每个值都包含“字符串”和“对象”类型，对象类型用于自定义配置，例如：

```ts
{
  renderer: 'longtext';
}
```

```ts
{
  renderer: {
    type: 'longtext',
    props: {
      rows: 2
    }
  }
}
```

#### text

原样输出文本。

#### date

格式化为 `YYYY-MM-DD`。

#### datetime

格式化为 `YYYY-MM-DD HH:mm:ss`。

#### media

使用 [MediaCard](./media-card) 组件渲染。

| 参数  | 描述                 | 类型                                          |
| ----- | -------------------- | --------------------------------------------- |
| props | 自定义组件的 `props` | [MediaCardProps](./media-card#mediacardprops) |

#### mediagroup

使用 [MediaCardGroup](./media-card-group) 组件渲染。

| 参数  | 描述                 | 类型                                                          |
| ----- | -------------------- | ------------------------------------------------------------- |
| props | 自定义组件的 `props` | [MediaCardGroupProps](./media-card-group#mediacardgroupprops) |

#### tag

使用 [ElTag](https://element-plus.org/zh-CN/component/tag) 组件渲染。

| 参数  | 描述                                    | 类型                                                                      |
| ----- | --------------------------------------- | ------------------------------------------------------------------------- |
| path  | 使用 `lodash` 的 `get` 函数获取嵌套数据 | string \| string[]                                                        |
| props | 自定义组件的 `props`                    | [ElTagProps](https://element-plus.org/zh-CN/component/tag#tag-attributes) |

#### longtext

使用 [LongText](./long-text) 组件渲染。

| 参数  | 描述                 | 类型                                       |
| ----- | -------------------- | ------------------------------------------ |
| props | 自定义组件的 `props` | [LongTextProps](./long-text#longtextprops) |

#### switch

使用 [ElSwitch](https://element-plus.org/zh-CN/component/switch) 组件渲染。

| 参数  | 描述                 | 类型                                                                      |
| ----- | -------------------- | ------------------------------------------------------------------------- |
| api   | 更新数据接口         | (value: any, row: any) => Promise\<any>                                   |
| props | 自定义组件的 `props` | [SwitchProps](https://element-plus.org/zh-CN/component/switch#attributes) |

#### click

使用 [ElLink](https://element-plus.org/zh-CN/component/link) 组件渲染。

| 参数    | 描述                 | 类型                                                                                     |
| ------- | -------------------- | ---------------------------------------------------------------------------------------- |
| props   | 自定义组件的 `props` | [LinkProps](https://element-plus.org/zh-CN/component/link#attributes)                    |
| format  | 格式化内容           | [TableColumnProps](#tablecolumnprops)['format']                                          |
| onClick | 点击时的回调         | (params: { row: any; value: any; index: number; column: TableColumnCtx\<any>; }) => void |

### TableActionProps

| 属性    | 描述           | 类型                                             | 默认值 |
| ------- | -------------- | ------------------------------------------------ | ------ |
| actions | 定义操作按钮   | TableActionItemAtom[] \| TableActionItemAtom[][] | []     |
| divider | 是否显示分割线 | boolean                                          | true   |

### TableActionItemAtom

```ts
type TableActionItemAtom =
  | TableActionItemProps
  | null
  | undefined
  | boolean
  | TableActionItemAtom[];
```

### TableActionItemProps

继承 `element-plus` 的 [Button Attributes](https://element-plus.org/zh-CN/component/button#button-attributes) 并有以下属性：

| 属性       | 描述           | 类型                                                                                                                                                                 | 默认值 |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| label      | 按钮内容       | string                                                                                                                                                               | -      |
| popconfirm | 定义气泡确认框 | [PopconfirmProps](https://element-plus.org/zh-CN/component/popconfirm#attributes) & \{ confirm?: (event: MouseEvent) => any; cancel?: (event: MouseEvent) => void; } | -      |
| onClick    | 点击按钮时出发 | (event: MouseEvent) => void                                                                                                                                          | -      |
| visible    | 是否显示按钮   | boolean                                                                                                                                                              | true   |
| icon       | 按钮前面的icon | [IconProps](./icon#iconprops)['name']                                                                                                                                | -      |

### TableActionConfig

```ts
interface TableActionConfig {
  itemProps?: TableActionItemProps;
}
```
