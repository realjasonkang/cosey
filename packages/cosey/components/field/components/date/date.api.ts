import { type DatePickerInstance, type DatePickerProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

type DateBaseValue = Date | number | string;

export interface MapDateModeValueType {
  date: DateBaseValue;
  dates: DateBaseValue[];
  daterange: [DateBaseValue, DateBaseValue];
  year: DateBaseValue;
  years: DateBaseValue[];
  yearrange: [DateBaseValue, DateBaseValue];
  month: DateBaseValue;
  months: DateBaseValue[];
  monthrange: [DateBaseValue, DateBaseValue];
  datetime: DateBaseValue;
  datetimerange: [DateBaseValue, DateBaseValue];
  week: DateBaseValue;
  weekrange: Date[];
}

export type FieldDateMode = keyof MapDateModeValueType;

export interface FieldDateProps<T extends FieldDateMode = 'date'>
  extends FieldComponentCommonProps {
  componentProps?: Partial<Omit<DatePickerProps, 'modelValue' | 'type'>> & {
    modelValue?: MapDateModeValueType[T];
    'onUpdate:modelValue'?: (value: MapDateModeValueType[T]) => void;
    onChange?: (value: MapDateModeValueType[T]) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onCalendarChange?: (val: [Date, null | Date]) => void;
    onPanelChange?: (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void;
    onVisibleChange?: (visibility: boolean) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldDateSlots>;
}

export interface FieldDateSlots {
  default?: (props: Record<string, any>) => any;
  'range-separator'?: (props: Record<string, any>) => any;
  'prev-month'?: (props: Record<string, any>) => any;
  'next-month'?: (props: Record<string, any>) => any;
  'prev-year'?: (props: Record<string, any>) => any;
  'next-year'?: (props: Record<string, any>) => any;
}

export interface FieldDateEmits<T extends FieldDateMode = 'date'> {
  (e: 'update:modelValue', value: MapDateModeValueType[T]): void;
  (e: 'change', value: MapDateModeValueType[T]): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'calendar-change', val: [Date, null | Date]): void;
  (e: 'panel-change', date: Date | [Date, Date], mode: 'month' | 'year', view?: string): void;
  (e: 'visible-change', visibility: boolean): void;
}

export type FieldDateExpose = DatePickerInstance;
