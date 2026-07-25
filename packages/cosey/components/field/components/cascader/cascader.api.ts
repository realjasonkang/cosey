import {
  type CascaderValue,
  type CascaderInstance,
  type CascaderNode,
  cascaderProps,
} from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { type ExtractPropTypes } from 'vue';

export interface FieldCascaderProps extends FieldComponentCommonProps {
  componentProps?: Partial<ExtractPropTypes<typeof cascaderProps>> & {
    'onUpdate:modelValue'?: (_: CascaderValue) => void;
    onChange?: (_: CascaderValue) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    onVisibleChange?: (val: boolean) => void;
    onExpandChange?: (val: CascaderValue) => void;
    onRemoveTag?: (val: CascaderNode['valueByOption']) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldCascaderSlots>;
}

export interface FieldCascaderSlots {
  default?: (props: { node: any; data: any }) => any;
  empty?: (props: Record<string, any>) => any;
}

export interface FieldCascaderEmits {
  (e: 'update:modelValue', _: CascaderValue): void;
  (e: 'change', _: CascaderValue): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'visibleChange', val: boolean): void;
  (e: 'expandChange', val: CascaderValue): void;
  (e: 'removeTag', val: CascaderNode['valueByOption']): void;
}

export type FieldCascaderExpose = CascaderInstance;
