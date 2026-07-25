import { type TimeSelectInstance, type TimeSelectProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldTimeSelectProps extends FieldComponentCommonProps {
  componentProps?: Partial<TimeSelectProps> & {
    'onUpdate:modelValue'?: (value: string) => void;
    onChange?: (value: string) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldTimeSelectSlots>;
}

export interface FieldTimeSelectSlots {
  'active-action'?: (props: Record<string, never>) => any;
  'inactive-action'?: (props: Record<string, never>) => any;
}

export interface FieldTimeSelectEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
}

export type FieldTimeSelectExpose = TimeSelectInstance;
