import { type FieldComponentCommonProps } from '../common';
import { type UploadSlots, type UploadEmits, type UploadProps } from '../../../upload';

export interface FieldUploadProps extends FieldComponentCommonProps {
  componentProps?: Partial<UploadProps> & {
    'onUpdate:modelValue'?: (value: boolean | string | number) => void;
    onChange?: (value: boolean | string | number) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldUploadSlots>;
}

export interface FieldUploadSlots extends UploadSlots {}

export interface FieldUploadEmits extends UploadEmits {}

export type FieldUploadExpose = {};
