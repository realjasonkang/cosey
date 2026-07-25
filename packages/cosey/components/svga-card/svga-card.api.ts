import { type ExtractPropTypes } from 'vue';
import { mediaCardBaseProps } from '../media-card';
import { svgaViewerProps } from '../svga-viewer';

export const svgaCardProps = {
  ...mediaCardBaseProps,
  ...svgaViewerProps,
};

export type SvgaCardProps = ExtractPropTypes<typeof svgaCardProps>;

export const svgaCardEmits = {
  open: () => true,
  close: () => true,
};

export type SvgaCardEmits = typeof svgaCardEmits;

export interface SvgaCardExpose {
  view: () => void;
}
