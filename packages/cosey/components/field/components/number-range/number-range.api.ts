import { type FieldComponentCommonProps } from '../common';
import {
  type InputNumberRangeEmits,
  type InputNumberRangeProps,
} from '../../../input-number-range';

export interface FieldNumberRangeProps extends FieldComponentCommonProps {
  componentProps?: Partial<InputNumberRangeProps> & {
    'onUpdate:modelValue'?: (value: number | undefined) => void;
    onChange?: (currentValue: number | undefined, oldValue: number | undefined) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldNumberRangeSlots>;
}

export interface FieldNumberRangeSlots {}

export interface FieldNumberRangeEmits extends InputNumberRangeEmits {}

export interface FieldNumberRangeExpose {}
