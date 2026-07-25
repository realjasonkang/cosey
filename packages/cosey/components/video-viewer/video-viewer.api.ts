import { type SlotsType, type ExtractPropTypes } from 'vue';
import { mediaViewerBaseEmits, mediaViewerBaseProps } from '../media-viewer';

export const videoViewerProps = {
  ...mediaViewerBaseProps,
};

export type VideoViewerProps = ExtractPropTypes<typeof videoViewerProps>;

export interface VideoViewerSlots {
  default: {};
}

export const videoViewerSlots = Object as SlotsType<VideoViewerSlots>;

export const videoViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type VideoViewerEmits = typeof videoViewerEmits;
