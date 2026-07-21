import { type AxiosRequestConfig } from 'axios';
import { type MediaCardBaseProps } from '../media-card';
import type { ExtractPropTypes, PropType, SlotsType } from 'vue';
import { type UploadContext } from '../../config/upload';

export type UploadFileStatus = 'unready' | 'ready' | 'loading' | 'success' | 'error';

export interface UploadFile {
  status: UploadFileStatus;
  name: string;
  size: number;
  type: string;
  raw: File | null;
  url: string | File;
  previewUrl: string;
  key: string;
  percent: number;
  controller: AbortController | null;
}

export const uploadProps = {
  accept: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 0,
  },
  multiple: {
    type: Boolean,
  },
  maxSize: {
    type: Number,
  },
  modelValue: {
    type: [String, Object, Array] as PropType<string | File | (string | File)[]>,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  single: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  selectOnly: {
    type: Boolean,
  },
  size: {
    type: String as PropType<MediaCardBaseProps['size']>,
    default: 'large' as const,
  },
  request: {
    type: [Function, null] as PropType<UploadContext['request']>,
  },
  requestConfig: {
    type: Object as PropType<AxiosRequestConfig>,
  },
  requestExtra: {
    type: Object as PropType<Record<PropertyKey, any>>,
  },
};

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export interface UploadSlots {
  default: {};
}

export const uploadSlots = Object as SlotsType<UploadSlots>;

export const uploadEmits = {
  exceed: () => true,
  oversize: (file: File) => file || true,
  'update:modelValue': (value: string | File | (string | File)[]) => value || true,
  change: (value: string | File | (string | File)[]) => value || true,
};

export type UploadEmits = typeof uploadEmits;

export const uploadItemProps = {
  file: {
    type: Object as PropType<UploadFile>,
    required: true,
    default: () => ({}),
  },
  readonly: {
    type: Boolean,
  },
  size: {
    type: String as PropType<MediaCardBaseProps['size']>,
    default: 'large' as const,
  },
};

export type UploadItemProps = ExtractPropTypes<typeof uploadItemProps>;

export const uploadItemEmits = {
  cancel: () => true,
  're-upload': () => true,
  remove: () => true,
};

export type UploadItemEmits = typeof uploadItemEmits;
