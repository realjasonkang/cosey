import { type InputInstance, type InputProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldInputProps extends FieldComponentCommonProps {
  componentProps?: Partial<InputProps> & {
    'onUpdate:modelValue'?: (value: string | number) => void;
    onChange?: (value: string | number) => void;
    onInput?: (value: string | number) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldInputSlots>;
}

export interface FieldInputSlots {
  prefix?: (props: Record<string, any>) => any;
  suffix?: (props: Record<string, any>) => any;
  prepend?: (props: Record<string, any>) => any;
  append?: (props: Record<string, any>) => any;
}

export interface FieldInputEmits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'input', value: string | number): void;
  (e: 'change', value: string | number): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
}

export type FieldInputExpose = InputInstance;
