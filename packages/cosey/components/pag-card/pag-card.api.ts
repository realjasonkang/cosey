import { type ExtractPropTypes } from 'vue';
import { mediaCardBaseProps } from '../media-card/media-card.api';
import { pagViewerProps } from '../pag-viewer/pag-viewer.api';

export const pagCardProps = {
  ...mediaCardBaseProps,
  ...pagViewerProps,
};

export type PagCardProps = ExtractPropTypes<typeof pagCardProps>;

export const pagCardEmits = {
  open: () => true,
  close: () => true,
};

export type PagCardEmits = typeof pagCardEmits;

export interface PagCardExpose {
  view: () => void;
}
