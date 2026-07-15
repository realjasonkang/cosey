import inquirer from 'inquirer';
import consola from 'consola';
import path from 'node:path';
import fs from 'node:fs/promises';
import fse from 'fs-extra';
import { kebabCase, upperFirst, camelCase, capitalize } from 'lodash-es';

async function replaceFileContent(filePath: string, replacement: (content: string) => string) {
  let content = await fs.readFile(filePath, 'utf8');
  content = replacement(content);
  await fs.writeFile(filePath, content);
}

async function createFiles(
  compDir: string,
  pascalName: string,
  kebabName: string,
  camelName: string,
) {
  // *.tsx
  await fse.outputFile(
    path.resolve(compDir, `${kebabName}.tsx`),
    `import { type ${pascalName}Expose, ${camelName}Props, ${camelName}Slots, ${camelName}Emits } from './${kebabName}.api';
import useStyle from './${kebabName}.style';
import { useComponentConfig } from '../config-provider';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Co${pascalName}',
  props: ${camelName}Props,
  slots: ${camelName}Slots,
  emits: ${camelName}Emits,
  setup(props, { slots, expose }) {
    const { prefixCls } = useComponentConfig('${kebabName}', props);

    const { hashId } = useStyle(prefixCls);

    expose<${pascalName}Expose>();

    return () => {
      return <div class={[hashId.value, prefixCls.value]}>{slots.default?.({})}</div>;
    };
  },
});

`,
  );

  // index.ts
  await fse.outputFile(
    path.resolve(compDir, `index.ts`),
    `import { enhanceComponent, type EnhancedComponent } from '../utils';
import ${pascalName} from './${kebabName}';

export * from './${kebabName}';

const _${pascalName}: EnhancedComponent<typeof ${pascalName}> = enhanceComponent(${pascalName});

export { _${pascalName} as ${pascalName} };
export default _${pascalName};

`,
  );

  // *.api.ts
  await fse.outputFile(
    path.resolve(compDir, `${kebabName}.api.ts`),
    `import type { ExtractPropTypes, SlotsType } from 'vue';

export const ${camelName}Props = {};

export type ${pascalName}Props = ExtractPropTypes<typeof ${camelName}Props>;

export interface ${pascalName}Slots {
  default: {};
}

export const ${camelName}Slots = {} as SlotsType<${pascalName}Slots>;

export const ${camelName}Emits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type ${pascalName}Emits = typeof ${camelName}Emits;

export interface ${pascalName}Expose {
  method: () => void;
}

`,
  );

  // style
  await fse.outputFile(
    path.resolve(compDir, `${kebabName}.style.ts`),
    `import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('Co${pascalName}', (token) => {
  const { componentCls } = token;

  return {
    [\`\${componentCls}\`]: {
    },
  };
});

`,
  );
}

// async function declareGlobalComponent(PascalName: string, externalPascalName: string) {
//   await replaceFileContent(
//     path.resolve(process.cwd(), 'packages/cosey/components/global.d.ts'),
//     (content) => {
//       return (
//         `declare module 'vue' {\n  export interface GlobalComponents {\n` +
//         [
//           ...new Set(
//             content
//               .split(/[{}]/)[2]
//               .trim()
//               .split('\n')
//               .map((item) => item.trim())
//               .concat([
//                 `${externalPascalName}: (typeof import('cosey/components'))['${PascalName}'];`,
//               ])
//               .sort()
//               .map((item) => `    ${item}`),
//           ),
//         ].join('\n') +
//         `\n  }\n}\n\nexport {}\n`
//       );
//     },
//   );
// }

async function exportInstalledComponent(pascalName: string, kebabName: string) {
  await replaceFileContent(
    path.resolve(process.cwd(), 'packages/cosey/components/components.ts'),
    (content) => {
      return content
        .replace(/(?:^import .*? from .*$\n)+/m, (m) => {
          return (
            `${m}import { ${pascalName} } from './${kebabName}';\n`
              .split('\n')
              .filter(Boolean)
              .sort()
              .join('\n') + '\n'
          );
        })
        .replace(/(?:^ {4}\w+: typeof \w+;\n)+/m, (m) => {
          return (
            `${m}    Co${pascalName}: typeof ${pascalName};\n`
              .split('\n')
              .filter(Boolean)
              .sort()
              .join('\n') + '\n'
          );
        })
        .replace(/(?:^ {2}\w+,\n)+/m, (m) => {
          return `${m}  ${pascalName},\n`.split('\n').filter(Boolean).sort().join('\n') + '\n';
        });
    },
  );
}

async function componentLibEntry(kebabName: string) {
  await replaceFileContent(
    path.resolve(process.cwd(), 'packages/cosey/components/index.ts'),
    (content) => {
      return content.replace(/(?:^export \* from .*$\n)+/m, (m) => {
        return (
          `${m}export * from './${kebabName}';\n`.split('\n').filter(Boolean).sort().join('\n') +
          '\n'
        );
      });
    },
  );
}

async function createMarkdown(
  markdownFile: string,
  pascalName: string,
  cnName: string,
  kebabName: string,
) {
  // README.md
  await fse.outputFile(
    markdownFile,
    `# ${pascalName} ${cnName}

## 简介

简介

## 代码演示

### 基础使用

基础使用

::: demo

${kebabName}/basic

:::

## API

### ${pascalName}Props

| 属性  | 描述  | 类型   | 默认值 |
| ----- | ----- | ------ | ------ |
| prop1 | 属性1 | string | -      |

### ${pascalName}Slots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ${pascalName}Emits

| 事件  | 描述       | 类型                        |
| ----- | ---------- | --------------------------- |
| click | 点击时触发 | (event: MouseEvent) => void |

### ${pascalName}Expose

| 属性   | 描述 | 类型       |
| ------ | ---- | ---------- |
| method | 描述 | () => void |

### ${pascalName}Options

| 属性 | 描述 | 类型   | 默认值 |
| ---- | ---- | ------ | ------ |
| prop | 描述 | string | -      |
`,
  );
}

async function createExample(exampleFile: string, externalKebabName: string) {
  await fse.outputFile(
    exampleFile,
    `<template>
  <${externalKebabName}></${externalKebabName}>
</template>

<script lang="ts" setup></script>
`,
  );
}

async function addRoute(kebabName: string, pascalName: string, cnName: string) {
  consola.info('需手动添加路由 (docs/.vitepress/config/index.ts)：\n');
  consola.log(`\n{ text: '${pascalName} ${cnName}', link: '/components/${kebabName}' }`);
}

export async function newComponent() {
  const compForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'enName',
      message: '请输入新增组件的“英文名”',
    },
    {
      type: 'input',
      name: 'cnName',
      message: '请输入新增组件的“中文名”',
    },
  ]);

  for (const [name, value] of Object.entries(compForm)) {
    if (!value) {
      consola.error(`${name}不能为空`);
      process.exit(1);
    }
  }

  for (const k in compForm) {
    compForm[k as keyof typeof compForm] = compForm[k as keyof typeof compForm].trim();
  }

  consola.info(compForm);

  const confirmForm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '确定新增组件？',
      default: false,
    },
  ]);

  if (!confirmForm.confirm) {
    consola.error('已取消新增组件');
    process.exit(1);
  }

  const ns = 'co';

  let enName = compForm.enName;
  if (new RegExp(`^${capitalize(ns)}[A-Z]`).test(enName)) {
    enName = enName.slice(1);
  } else if (new RegExp(`^${ns}-[a-z]`).test(enName)) {
    enName = enName.slice(2);
  }

  const kebabName = kebabCase(enName);
  const externalKebabName = `${ns}-${kebabName}`;
  const camelName = camelCase(kebabName);
  const pascalName = upperFirst(camelName);
  const externalPascalName = `${capitalize(ns)}${pascalName}`;
  const cnName = compForm.cnName;

  const compDir = path.resolve(process.cwd(), `packages/cosey/components/${kebabName}`);

  const exampleFile = path.resolve(process.cwd(), `docs/examples/${kebabName}/basic.vue`);

  const markdownFile = path.resolve(process.cwd(), `docs/markdown/components/${kebabName}.md`);

  try {
    await fs.access(compDir);
    consola.error(`目录已存在: ${compDir}`);
    process.exit(1);
  } catch {
    void 0;
  }

  void externalPascalName;
  // void declareGlobalComponent;

  const steps = [
    ['创建组件', () => createFiles(compDir, pascalName, kebabName, camelName)],
    // ['声明全局组件', () => declareGlobalComponent(pascalName, externalPascalName)],
    ['导出要安装的组件', () => exportInstalledComponent(pascalName, kebabName)],
    ['组件库入口', () => componentLibEntry(kebabName)],
    ['创建 markdown 文件', () => createMarkdown(markdownFile, pascalName, cnName, kebabName)],
    ['创建案例', () => createExample(exampleFile, externalKebabName)],
    ['添加路由', () => addRoute(kebabName, pascalName, cnName)],
  ] as const;

  for (const [i, [stepName, step]] of steps.entries()) {
    consola.info(`当前步骤：${i + 1}/${steps.length} ${stepName}`);
    await step();
  }

  consola.success('成功新增组件');
}

newComponent();
