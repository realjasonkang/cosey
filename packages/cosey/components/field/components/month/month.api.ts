import {
  type FieldDateSlots,
  type FieldDateEmits,
  type FieldDateExpose,
  type FieldDateProps,
} from '../date/date.api';

export type FieldMonthProps = FieldDateProps<'month'>;

export type FieldMonthSlots = FieldDateSlots;

export type FieldMonthEmits = FieldDateEmits<'month'>;

export type FieldMonthExpose = FieldDateExpose;
