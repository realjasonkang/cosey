import { type ExtractPropTypes } from 'vue';

export const FontIconProps = {
  name: {
    type: String,
  },
};

export type SvgIconProps = ExtractPropTypes<typeof FontIconProps>;
