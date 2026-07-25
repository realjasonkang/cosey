import {
  type FieldDateSlots,
  type FieldDateEmits,
  type FieldDateExpose,
  type FieldDateProps,
} from '../date/date.api';

export type FieldWeekProps = FieldDateProps<'week'>;

export type FieldWeekSlots = FieldDateSlots;

export type FieldWeekEmits = FieldDateEmits<'week'>;

export type FieldWeekExpose = FieldDateExpose;
