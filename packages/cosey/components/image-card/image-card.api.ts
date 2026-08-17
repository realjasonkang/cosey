import { type SlotsType, type ExtractPropTypes } from 'vue';
import { imageProps, imageEmits } from 'element-plus';
import { mediaCardBaseProps } from '../media-card/media-card.api';

export const imageCardProps = {
  ...imageProps,
  fit: {
    ...imageProps.fit,
    default: 'contain',
  },
  ...mediaCardBaseProps,
};

export type ImageCardProps = ExtractPropTypes<typeof imageCardProps>;

export const imageCardEmits = {
  ...imageEmits,
};

export type ImageCardEmits = typeof imageCardEmits;

export interface ImageCardSlots {
  placeholder: {};
  error: {};
  viewer: {};
}

export const imageCardSlots = Object as SlotsType<ImageCardSlots>;

export interface ImageCardExpose {
  view: () => void;
}
