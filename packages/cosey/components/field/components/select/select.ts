import { type ExtractPropTypes } from 'vue';
import { SelectProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { Props } from '../../../../hooks';

export interface FieldSelectObjectOption {
  label?: string | number;
  value?: string | number | boolean;
  disabled?: boolean;
  [key: PropertyKey]: any;
}

export interface FieldSelectGroup extends FieldSelectObjectOption {
  children: (FieldSelectObjectOption | string | number | boolean)[];
}

export type FieldSelectOption =
  | FieldSelectObjectOption
  | FieldSelectGroup
  | string
  | number
  | boolean;

export interface FieldSelectConvertedGroup {
  label?: string;
  disabled?: boolean;
  children: FieldSelectObjectOption[];
}

export type FieldSelectConvertedOption = FieldSelectConvertedGroup | FieldSelectObjectOption;

export interface FieldSelectProps extends FieldComponentCommonProps {
  componentProps?: Partial<ExtractPropTypes<SelectProps>> & {
    'onUpdate:modelValue'?: (value: any) => void;
    onChange?: (value: any) => void;
    onVisibleChange?: (visible: boolean) => void;
    onRemoveTag?: (tagValue: any) => void;
    onClear?: () => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    [key: PropertyKey]: any;
  } & {
    options?: FieldSelectOption[];
    props?: Props;
    optionProps?:
      | Record<PropertyKey, any>
      | ((props: FieldSelectObjectOption, index: number) => Record<PropertyKey, any>);
  };
  componentSlots?: Partial<FieldSelectSlots>;
}

export const fieldSelectOmitKeys = ['options', 'props', 'optionProps'];

export interface FieldSelectSlots {
  default?: (props: Record<string, any>) => any;
  header?: (props: Record<string, any>) => any;
  footer?: (props: Record<string, any>) => any;
  prefix?: (props: Record<string, any>) => any;
  empty?: (props: Record<string, any>) => any;
  tag?: (props: Record<string, any>) => any;
  loading?: (props: Record<string, any>) => any;
  label?: (props: Record<string, any>) => any;
  option?: (props: { option: FieldSelectObjectOption; index: number }) => any;
}

export interface FieldSelectEmits {
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'remove-tag', tagValue: any): void;
  (e: 'clear'): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}

export type FieldSelectExpose = {
  focus: () => void;
  blur: () => void;
};

export function flatGroup(options: FieldSelectConvertedOption[], children = 'children') {
  return options
    .map((option) => {
      if (children in option) {
        return option[children as keyof typeof option];
      }
      return option;
    })
    .flat();
}
