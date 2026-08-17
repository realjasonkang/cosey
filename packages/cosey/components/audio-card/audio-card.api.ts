import { type ExtractPropTypes } from 'vue';
import { mediaCardBaseProps } from '../media-card/media-card.api';
import { audioViewerProps } from '../audio-viewer';

export const audioCardProps = {
  ...mediaCardBaseProps,
  ...audioViewerProps,
};

export type AudioCardProps = ExtractPropTypes<typeof audioCardProps>;

export const audioCardEmits = {
  open: () => true,
  close: () => true,
};

export type AudioCardEmits = typeof audioCardEmits;

export interface AudioCardExpose {
  view: () => void;
}
