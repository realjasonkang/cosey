import { type CheckboxValueType, type CheckboxInstance, type CheckboxProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldCheckboxProps extends FieldComponentCommonProps {
  componentProps?: Partial<CheckboxProps> & {
    'onUpdate:modelValue'?: (val: CheckboxValueType) => void;
    onChange?: (val: CheckboxValueType) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldCheckboxSlots>;
}

export interface FieldCheckboxSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FieldCheckboxEmits {
  (e: 'update:modelValue', val: CheckboxValueType): void;
  (e: 'change', val: CheckboxValueType): void;
}

export type FieldCheckboxExpose = CheckboxInstance;
