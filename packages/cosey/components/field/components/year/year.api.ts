import {
  type FieldDateSlots,
  type FieldDateEmits,
  type FieldDateExpose,
  type FieldDateProps,
} from '../date/date.api';

export type FieldYearProps = FieldDateProps<'year'>;

export type FieldYearSlots = FieldDateSlots;

export type FieldYearEmits = FieldDateEmits<'year'>;

export type FieldYearExpose = FieldDateExpose;
