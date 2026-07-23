import type { ExtractPropTypes, PropType, SlotsType } from 'vue';
import { isNullish } from '../../utils';
import { timePickerDefaultProps } from 'element-plus';

export const weekRangePickerProps = {
  ...timePickerDefaultProps,
  modelValue: {
    type: Array as PropType<Date[]>,
  },
};

export type WeekRangePickerProps = ExtractPropTypes<typeof weekRangePickerProps>;

export interface WeekRangePickerSlots {
  'range-separator': {};
  default: {};
}

export const weekRangePickerSlots = {} as SlotsType<WeekRangePickerSlots>;

export const weekRangePickerEmits = {
  'update:modelValue': (value: Date[] | undefined | null) =>
    Array.isArray(value) || isNullish(value),
  change: (value: Date[] | undefined | null) => Array.isArray(value) || isNullish(value),
};

export type WeekRangePickerEmits = typeof weekRangePickerEmits;

export interface WeekRangePickerExpose {
  focus: () => void;
  blur: () => void;
  handleOpen: () => void;
  handleClose: () => void;
}
