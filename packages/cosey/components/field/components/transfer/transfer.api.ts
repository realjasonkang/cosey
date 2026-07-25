import {
  type TransferKey,
  type TransferInstance,
  type TransferProps,
  type TransferDirection,
} from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export interface FieldTransferProps extends FieldComponentCommonProps {
  componentProps?: Partial<TransferProps> & {
    'onUpdate:modelValue'?: (value: TransferKey[]) => void;
    onChange?: (
      value: TransferKey[],
      direction: TransferDirection,
      movedKeys: TransferKey[],
    ) => void;
    onLeftCheckChange?: (value: TransferKey[], movedKeys?: TransferKey[]) => void;
    onRightCheckChange?: (value: TransferKey[], movedKeys?: TransferKey[]) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldTransferSlots>;
}

export interface FieldTransferSlots {
  default?: (props: Record<string, never>) => any;
  'left-footer'?: (props: Record<string, never>) => any;
  'right-footer'?: (props: Record<string, never>) => any;
}

export interface FieldTransferEmits {
  (e: 'update:modelValue', value: TransferKey[]): void;
  (e: 'change', value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]): void;
  (e: 'left-check-change', value: TransferKey[], movedKeys?: TransferKey[]): void;
  (e: 'right-check-change', value: TransferKey[], movedKeys?: TransferKey[]): void;
}

export type FieldTransferExpose = TransferInstance;
