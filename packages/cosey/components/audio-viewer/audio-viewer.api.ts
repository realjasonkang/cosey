import { ExtractPropTypes, SlotsType } from 'vue';
import { mediaViewerBaseEmits, mediaViewerBaseProps, MediaViewerSlots } from '../media-viewer';

export const audioViewerProps = {
  ...mediaViewerBaseProps,
};

export type AudioViewerProps = ExtractPropTypes<typeof audioViewerProps>;

export interface AudioViewerSlots extends MediaViewerSlots {}

export const audioViewerSlots = Object as SlotsType<AudioViewerSlots>;

export const audioViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type AudioViewerEmits = typeof audioViewerEmits;
