import { type TimePickerDefaultProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

type DateBaseValue = Date | number | string;

export interface MapTimeModeValueType {
  time: DateBaseValue;
  timerange: [DateBaseValue, DateBaseValue];
}

export type FieldTimeMode = keyof MapTimeModeValueType;

export interface FieldTimeProps<T extends FieldTimeMode = 'time'>
  extends FieldComponentCommonProps {
  componentProps?: Partial<Omit<TimePickerDefaultProps, 'modelValue'>> & {
    modelValue?: MapTimeModeValueType[T];
    'onUpdate:modelValue'?: (value: MapTimeModeValueType[T]) => void;
    onChange?: (value: MapTimeModeValueType[T]) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    onVisibleChange?: (visibility: boolean) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldTimeSlots>;
}

export interface FieldTimeSlots {}

export interface FieldTimeEmits<T extends FieldTimeMode = 'time'> {
  (e: 'update:modelValue', value: MapTimeModeValueType[T]): void;
  (e: 'change', value: MapTimeModeValueType[T]): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'visible-change', visibility: boolean): void;
}

export type FieldTimeExpose = {
  focus: (e: FocusEvent | undefined) => void;
  blur: (e: FocusEvent | undefined) => void;
  handleOpen: () => void;
  handleClose: () => void;
};
