import { type ExtractPropTypes, type SlotsType, type PropType } from 'vue';
import { transitionProps } from '../transition';
import { omit } from 'lodash-es';

export const transitionGroupProps = {
  ...omit(transitionProps, ['mode']),
  tag: {
    type: String,
  },
  moveClass: {
    type: String,
  },
  effect: {
    type: String as PropType<'slide' | 'flip' | 'fade' | (string & {})>,
    default: 'fade',
  },
};

export type TransitionGroupProps = ExtractPropTypes<typeof transitionGroupProps>;

export interface TransitionGroupSlots {
  default: {};
}

export const transitionGroupSlots = Object as SlotsType<TransitionGroupSlots>;
