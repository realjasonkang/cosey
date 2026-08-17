import { SlotsType, type ExtractPropTypes } from 'vue';
import { mediaCardBaseProps } from '../media-card/media-card.api';

export const fileCardProps = {
  ...mediaCardBaseProps,
};

export type FileCardProps = ExtractPropTypes<typeof fileCardProps>;

export interface FileCardSlots {
  default: {};
}

export const fileCardSlots = Object as SlotsType<FileCardSlots>;
