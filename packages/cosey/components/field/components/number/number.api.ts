import { type InputNumberInstance, type InputNumberProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldNumberProps extends FieldComponentCommonProps {
  componentProps?: Partial<Omit<InputNumberProps, 'modelValue'>> & {
    modelValue?: number | null | string;
    'onUpdate:modelValue'?: (value: number | undefined) => void;
    onChange?: (currentValue: number | undefined, oldValue: number | undefined) => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldNumberSlots>;
}

export interface FieldNumberSlots {
  'decrease-icon'?: (props: Record<string, any>) => any;
  'increase-icon'?: (props: Record<string, any>) => any;
}

export interface FieldNumberEmits {
  (e: 'update:modelValue', value: number | undefined): void;
  (e: 'change', currentValue: number | undefined, oldValue: number | undefined): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}

export type FieldNumberExpose = InputNumberInstance;
