import { ExtractPropTypes, SlotsType } from 'vue';
import { mediaViewerBaseEmits, mediaViewerBaseProps, MediaViewerSlots } from '../media-viewer';

export const svgaViewerProps = {
  ...mediaViewerBaseProps,
};

export type SvgaViewerProps = ExtractPropTypes<typeof svgaViewerProps>;

export interface SvgaViewerSlots extends MediaViewerSlots {}

export const svgaViewerSlots = Object as SlotsType<SvgaViewerSlots>;

export const svgaViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type SvgaViewerEmits = typeof svgaViewerEmits;
