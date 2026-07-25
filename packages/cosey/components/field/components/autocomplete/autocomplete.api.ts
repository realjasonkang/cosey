import { type AutocompleteInstance, type AutocompleteProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldAutocompleteProps extends FieldComponentCommonProps {
  componentProps?: Partial<AutocompleteProps> & {
    'onUpdate:modelValue'?: (value: string) => void;
    onInput?: (value: string) => void;
    onChange?: (value: string) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    onSelect?: (item: Record<string, any>) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldAutocompleteSlots>;
}

export interface FieldAutocompleteSlots {
  default?: (props: { item: Record<string, any> }) => any;
  prefix?: (props: Record<string, any>) => any;
  suffix?: (props: Record<string, any>) => any;
  prepend?: (props: Record<string, any>) => any;
  append?: (props: Record<string, any>) => any;
  loading?: (props: Record<string, any>) => any;
}

export interface FieldAutocompleteEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'select', item: Record<string, any>): void;
}

export type FieldAutocompleteExpose = AutocompleteInstance;
