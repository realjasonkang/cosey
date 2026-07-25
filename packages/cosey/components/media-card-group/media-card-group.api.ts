import type { ExtractPropTypes, PropType, SlotsType } from 'vue';
import type { MediaCardBasePublicProps } from '../media-card';

export const mediaCardGroupProps = {
  srcset: {
    type: [String, Array] as PropType<string | (MediaCardBasePublicProps | string)[]>,
  },
  size: {
    type: String as PropType<MediaCardBasePublicProps['size']>,
  },
};

export type MediaCardGroupProps = ExtractPropTypes<typeof mediaCardGroupProps>;

export interface MediaCardGroupSlots {
  default: {};
}

export const mediaCardGroupSlots = {} as SlotsType<MediaCardGroupSlots>;

export interface MediaCardGroupEmits {}

export interface MediaCardGroupExpose {}
