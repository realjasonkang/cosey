import { SelectV2Props } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldSelectV2Props extends FieldComponentCommonProps {
  componentProps?: Partial<SelectV2Props> & {
    'onUpdate:modelValue'?: (value: any) => void;
    onChange?: (value: any) => void;
    onVisibleChange?: (visible: boolean) => void;
    onRemoveTag?: (tagValue: any) => void;
    onClear?: () => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    [key: PropertyKey]: any;
  } & {
    optionProps?: (props: Record<PropertyKey, any>, index: number) => Record<PropertyKey, any>;
  };
  componentSlots?: Partial<FieldSelectV2Slots>;
}

export const fieldSelectOmitKeys = ['optionProps'];

export interface FieldSelectV2Slots {
  default?: (props: Record<string, any>) => any;
  header?: (props: Record<string, any>) => any;
  footer?: (props: Record<string, any>) => any;
  prefix?: (props: Record<string, any>) => any;
  empty?: (props: Record<string, any>) => any;
  tag?: (props: Record<string, any>) => any;
  loading?: (props: Record<string, any>) => any;
  label?: (props: Record<string, any>) => any;
}

export interface FieldSelectV2Emits {
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'remove-tag', tagValue: any): void;
  (e: 'clear'): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}

export type FieldSelectV2Expose = {
  focus: () => void;
  blur: () => void;
};

export function flatGroup(options: SelectV2Props['options'], children = 'options') {
  return options
    .map((option) => {
      if (children in option) {
        return option[children as keyof typeof option];
      }
      return option;
    })
    .flat();
}
