import { SlotsType, type ExtractPublicPropTypes, type PropType } from 'vue';
import { type FormSlots, type FormExpose, formProps, formEmits } from '../form/form.api';
import { type ColPublicProps } from '../col';
import { isBoolean } from '../../utils';

export const defaultMapSizeColNumber = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 6,
};

export const formQueryProps = {
  ...formProps,
  grid: {
    type: Boolean,
    default: true,
  },
  colProps: {
    type: Object as PropType<ColPublicProps>,
    default: () => defaultMapSizeColNumber,
  },
  minFields: {
    type: Number,
    default: -1,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
  resetValues: {
    type: Function as PropType<() => Record<string, any>>,
  },
};

export type FormQueryProps = ExtractPublicPropTypes<typeof formQueryProps>;

export interface FormQuerySlots extends FormSlots {}

export const formQuerySlots = Object as SlotsType<FormQuerySlots>;

export const formQueryEmits = {
  ...formEmits,
  'update:collapsed': (val: boolean) => isBoolean(val),
};

export type FormQueryEmits = typeof formQueryEmits;

export interface FormQueryExpose extends FormExpose {}

export interface FormQueryContext {
  shouldHide: (index: number) => boolean;
}

export const formQueryContextSymbol = Symbol('formQueryContext');
