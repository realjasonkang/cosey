import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutLogin', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-title`]: {
        marginBlockEnd: token.marginXL,
        textAlign: 'center',
        fontSize: token.fontSizeXL,
        lineHeight: token.lineHeightHeading2,
        fontWeight: token.fontWeightStrong,
      },

      [`${componentCls}-icon`]: {
        color: token.colorTextSecondary,
      },

      [`${componentCls}-captcha-wrapper`]: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: token.margin,
      },

      [`${componentCls}-captcha`]: {
        width: 'auto',
        minWidth: 100,
        height: 40,
        objectFit: 'contain',
        flex: 'none',
        cursor: 'pointer',
      },

      [`${componentCls}-button`]: {
        width: '100%',
      },
    },
  };
});
