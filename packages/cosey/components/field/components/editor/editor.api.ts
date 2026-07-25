import { type FieldComponentCommonProps } from '../common';
import type { EditorEmits, EditorProps } from '../../../editor';

export interface FieldEditorProps extends FieldComponentCommonProps {
  componentProps?: Partial<EditorProps> & {
    'onUpdate:modelValue'?: (value: string) => void;
    onChange?: (value: string) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldEditorSlots>;
}

export interface FieldEditorSlots {}

export interface FieldEditorEmits extends EditorEmits {}

export interface FieldEditorExpose {}
