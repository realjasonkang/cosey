import { ExtractPropTypes, SlotsType } from 'vue';
import { mediaViewerBaseEmits, mediaViewerBaseProps, MediaViewerSlots } from '../media-viewer';

export const pagViewerProps = {
  ...mediaViewerBaseProps,
};

export type PagViewerProps = ExtractPropTypes<typeof pagViewerProps>;

export interface PagViewerSlots extends MediaViewerSlots {}

export const pagViewerSlots = Object as SlotsType<PagViewerSlots>;

export const pagViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type PagViewerEmits = typeof pagViewerEmits;
