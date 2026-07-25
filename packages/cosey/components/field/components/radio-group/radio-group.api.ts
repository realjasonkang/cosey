import { type RadioProps, type RadioGroupInstance, type RadioGroupProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { Props } from '../../../../hooks';

export type FieldRadioGroupOption = Partial<RadioProps> | string | number;

export interface FieldRadioGroupProps extends FieldComponentCommonProps {
  componentProps?: Partial<Omit<RadioGroupProps, 'options'>> & {
    'onUpdate:modelValue'?: (value?: string | number | boolean) => void;
    onChange?: (value?: string | number | boolean) => void;
    [key: PropertyKey]: any;
  } & {
    options?: FieldRadioGroupOption[];
    props?: Props;
    type?: 'button' | 'radio';
  };
  componentSlots?: Partial<FieldRadioGroupSlots>;
}

export interface FieldRadioGroupSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FieldRadioGroupEmits {
  (e: 'update:modelValue', value?: string | number | boolean): void;
  (e: 'change', value?: string | number | boolean): void;
}

export type FieldRadioGroupExpose = RadioGroupInstance;
