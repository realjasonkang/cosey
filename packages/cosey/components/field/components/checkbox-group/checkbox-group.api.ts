import {
  type CheckboxGroupValueType,
  type CheckboxGroupInstance,
  type CheckboxGroupProps,
  type CheckboxValueType,
  type CheckboxProps,
} from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { Props } from '../../../../hooks';

export type FieldCheckboxGroupOption = Partial<CheckboxProps> | string | number;

type CheckboxPropsObjectOption = Partial<CheckboxProps> & { [k: string]: any };

export interface FieldCheckboxGroupProps extends FieldComponentCommonProps {
  componentProps?: Partial<CheckboxGroupProps> & {
    'onUpdate:modelValue'?: (val: CheckboxGroupValueType) => void;
    onChange?: (val: CheckboxValueType[]) => void;
    [key: PropertyKey]: any;
  } & {
    options?: FieldCheckboxGroupOption[];
    props?: Props;
    type?: 'button' | 'checkbox';
    checkboxWidth?: string | number;
    indeterminate?: boolean;
    maxHeight?: string | number;
    checkboxProps?:
      | CheckboxPropsObjectOption
      | ((props: CheckboxPropsObjectOption, index: number) => CheckboxPropsObjectOption);
  };
  componentSlots?: Partial<FieldCheckboxGroupSlots>;
}

export const fieldCheckboxGroupOmitKeys = [
  'options',
  'props',
  'type',
  'checkboxWidth',
  'maxHeight',
  'checkboxProps',
] as const;

export interface FieldCheckboxGroupSlots {
  default?: (props: Record<string, any>) => any;
  checkbox?: (props: { option: Record<PropertyKey, any>; index: number }) => any;
}

export interface FieldCheckboxGroupEmits {
  (e: 'update:modelValue', val: CheckboxGroupValueType): void;
  (e: 'change', val: CheckboxValueType[]): void;
}

export type FieldCheckboxGroupExpose = CheckboxGroupInstance;
