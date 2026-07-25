import { type InputTagEmits, type InputTagProps } from 'element-plus';
import { FieldComponentCommonProps } from '../common';

export interface FieldInputTagProps extends FieldComponentCommonProps {
  componentProps?: Partial<InputTagProps>;
  componentSlots?: Partial<FieldInputTagSlots>;
}

export interface FieldInputTagSlots {
  tag?: (props: { value: string; index: number }) => any;
  prefix?: (props: Record<string, any>) => any;
  suffix?: (props: Record<string, any>) => any;
}

export interface FieldInputTagEmits extends InputTagEmits {}

export interface FieldInputTagExpose {
  focus: () => void;
  blur: () => void;
}
