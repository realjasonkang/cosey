import { type MentionOption, type MentionInstance, type MentionProps } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import { type FieldInputSlots } from '../input/input.api';

export interface FieldMentionProps extends FieldComponentCommonProps {
  componentProps?: Partial<MentionProps> & {
    'onUpdate:modelValue'?: (value: string | number) => void;
    onChange?: (value: string | number) => void;
    onMention?: (value: string | number) => void;
    onFocus?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;
    onClear?: () => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldMentionSlots>;
}

export interface FieldMentionSlots extends FieldInputSlots {
  label?: (props: { item: MentionOption; index: number }) => any;
  loading?: (props: Record<string, any>) => any;
  header?: (props: Record<string, any>) => any;
  footer?: (props: Record<string, any>) => any;
}

export interface FieldMentionEmits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'input', value: string | number): void;
  (e: 'change', value: string | number): void;
  (e: 'focus', evt: FocusEvent): void;
  (e: 'blur', evt: FocusEvent): void;
  (e: 'clear'): void;
}

export type FieldMentionExpose = MentionInstance;
