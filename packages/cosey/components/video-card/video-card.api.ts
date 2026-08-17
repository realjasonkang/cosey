import { type ExtractPropTypes } from 'vue';
import { mediaCardBaseProps } from '../media-card/media-card.api';
import { videoViewerProps } from '../video-viewer';

export const videoCardProps = {
  ...mediaCardBaseProps,
  ...videoViewerProps,
};

export type VideoCardProps = ExtractPropTypes<typeof videoCardProps>;

export const videoCardEmits = {
  open: () => true,
  close: () => true,
};

export type VideoCardEmits = typeof videoCardEmits;

export interface VideoCardExpose {
  view: () => void;
}
