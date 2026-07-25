import { type RateInstance, type RateProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldRateProps extends FieldComponentCommonProps {
  componentProps?: Partial<RateProps> & {
    'onUpdate:modelValue'?: (value: number) => void;
    onChange?: (value: number) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onHoverChange?: (value: number) => void;
    onKeydown?: (event: MouseEvent) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldRateSlots>;
}

export interface FieldRateSlots {}

export interface FieldRateEmits {
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
  (e: 'hoverChange', value: number): void;
  (e: 'keydown', event: MouseEvent): void;
}

export type FieldRateExpose = RateInstance;
