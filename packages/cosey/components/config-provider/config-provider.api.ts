import {
  type ExtractPropTypes,
  type PropType,
  type InjectionKey,
  type MaybeRefOrGetter,
  inject,
  provide,
} from 'vue';
import { type TableConfig } from '../table';
import { type TableActionConfig } from '../table-action';
import { ThemeConfig } from '../../theme';

export const configProviderProps = {
  theme: {
    type: Object as PropType<ThemeConfig>,
  },
  table: {
    type: Object as PropType<TableConfig>,
  },
  tableAction: {
    type: Object as PropType<TableActionConfig>,
  },
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

export interface ConfigProviderInnerProps {
  theme?: MaybeRefOrGetter<{} | undefined>;
  table: MaybeRefOrGetter<TableConfig | undefined>;
  tableAction: MaybeRefOrGetter<TableActionConfig | undefined>;
}

const configProviderKey = Symbol('configProvider') as InjectionKey<ConfigProviderInnerProps>;

export const useConfigProvide = (props: ConfigProviderInnerProps) => {
  return provide(configProviderKey, props);
};

export const useConfig = () => {
  return inject(configProviderKey, null);
};
