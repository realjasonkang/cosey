import { type SliderProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { type Arrayable } from 'element-plus/es/utils/typescript.mjs';

export interface FieldSliderProps extends FieldComponentCommonProps {
  componentProps?: Partial<SliderProps> & {
    'onUpdate:modelValue'?: (value: Arrayable<number>) => void;
    onChange?: (value: Arrayable<number>) => void;
    onInput?: (value: Arrayable<number>) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldSliderSlots>;
}

export interface FieldSliderSlots {}

export interface FieldSliderEmits {
  (e: 'update:modelValue', value: Arrayable<number>): void;
  (e: 'change', value: Arrayable<number>): void;
  (e: 'input', value: Arrayable<number>): void;
}

export type FieldSliderExpose = {};
