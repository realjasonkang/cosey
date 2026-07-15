import { getSimpleStyleHook } from '../theme';
import {
  getMediaCardFileNameStyle,
  getMediaCardFileTypeStyle,
  getMediaCardStyle,
} from '../media-card/media-card.style';

export default getSimpleStyleHook('CoPagCard', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      ...getMediaCardFileNameStyle(token),
      ...getMediaCardFileTypeStyle(token),
      cursor: 'pointer',
      background: token.colorFillTertiary,
    },
  };
});
