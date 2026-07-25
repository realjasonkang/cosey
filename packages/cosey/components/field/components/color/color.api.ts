import { type ColorPickerInstance, type ColorPickerProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldColorProps extends FieldComponentCommonProps {
  componentProps?: Partial<ColorPickerProps> & {
    'onUpdate:modelValue'?: (val: string | null) => void;
    onChange?: (val: string | null) => void;
    onActiveChange?: (val: string | null) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldColorSlots>;
}

export interface FieldColorSlots {}

export interface FieldColorEmits {
  (e: 'update:modelValue', val: string | null): void;
  (e: 'change', val: string | null): void;
  (e: 'activeChange', val: string | null): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
}

export type FieldColorExpose = ColorPickerInstance;
