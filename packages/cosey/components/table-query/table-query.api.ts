import { type FieldType } from '../field';
import { type FormItemProps, formExposeKeys } from '../form';
import {
  type FormQuerySlots,
  type FormQueryExpose,
  formQueryProps,
  formQueryEmits,
} from '../form-query';
import type { PropType, ExtractPropTypes, VNodeChild, SlotsType } from 'vue';

export type TableQueryScheme = FormItemProps<FieldType> & {
  render?: (params: { model: Record<string, any> }) => VNodeChild;
  slots?: Record<string, unknown>;
};

const tableQueryExtraProps = {
  schemes: {
    type: Array as PropType<TableQueryScheme[]>,
    default: () => [],
  },
};

export const tableQueryProps = {
  ...formQueryProps,
  ...tableQueryExtraProps,
};

export const omittedTableQueryProps = Object.keys(
  tableQueryExtraProps,
) as unknown as keyof typeof tableQueryProps;

export type TableQueryProps = Partial<ExtractPropTypes<typeof tableQueryProps>>;

export interface TableQuerySlots extends FormQuerySlots {}

export const tableQuerySlots = Object as SlotsType<TableQuerySlots>;

export const tableQueryEmits = {
  ...formQueryEmits,
};

export type TableQueryEmits = typeof tableQueryEmits;

export interface TableQueryCustomExpose {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<PropertyKey, any>) => void;
  getFormModel: () => Record<string, any>;
  reset: (values?: Record<PropertyKey, any>) => void;
}

export interface TableQueryExpose extends Omit<FormQueryExpose, 'reset'>, TableQueryCustomExpose {}

export const tableQueryExposeKeys = [
  ...formExposeKeys,
  'getFieldsValue',
  'setFieldsValue',
  'getFormModel',
  'reset',
];

export function createScheme<T extends FieldType>(props: FormItemProps<T>) {
  return props;
}
