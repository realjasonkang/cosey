import { type SegmentedInstance, type SegmentedProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldSegmentedProps extends FieldComponentCommonProps {
  componentProps?: Partial<SegmentedProps> & {
    'onUpdate:modelValue'?: (value: string | number | boolean) => void;
    onChange?: (value: string | number | boolean) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldSegmentedSlots>;
}

export interface FieldSegmentedSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FieldSegmentedEmits {
  (e: 'update:modelValue', value: string | number | boolean): void;
  (e: 'change', value: string | number | boolean): void;
}

export type FieldSegmentedExpose = SegmentedInstance;
