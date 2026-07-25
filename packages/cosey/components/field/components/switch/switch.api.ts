import { type SwitchInstance, type SwitchProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldSwitchProps extends FieldComponentCommonProps {
  componentProps?: Partial<SwitchProps> & {
    'onUpdate:modelValue'?: (value: boolean | string | number) => void;
    onChange?: (value: boolean | string | number) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldSwitchSlots>;
}

export interface FieldSwitchSlots {
  'active-action'?: (props: Record<string, never>) => any;
  'inactive-action'?: (props: Record<string, never>) => any;
}

export interface FieldSwitchEmits {
  (e: 'update:modelValue', value: boolean | string | number): void;
  (e: 'change', value: boolean | string | number): void;
}

export type FieldSwitchExpose = SwitchInstance;
