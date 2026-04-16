import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('CoDocsDemo', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      marginBlock: token.margin,
      borderRadius: token.borderRadius,
      border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      backgroundColor: token.colorBgContainer,

      [`${componentCls}-display`]: {
        overflow: 'auto',
        padding: token.padding,
      },

      [`${componentCls}-toolbar`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: token.sizeXXL,
        paddingInline: token.padding,
        paddingBlock: token.paddingXS,
        borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      [`${componentCls}-code`]: {
        'div[class*="language-"]': {
          borderRadius: 0,

          position: 'relative',
          margin: '0',
          backgroundColor: 'var(--vp-code-block-bg)',
          overflowX: 'auto',
          transition: 'background-color .5s',

          pre: {
            position: 'relative',
            zIndex: 1,
            margin: 0,
            padding: '20px 0',
            background: 'transparent',
            overflowX: 'auto',
          },

          code: {
            display: 'block',
            padding: '0 24px',
            width: 'fit-content',
            minWidth: '100%',
            lineHeight: 'var(--vp-code-line-height)',
            fontSize: 'var(--vp-code-font-size)',
            color: 'var(--vp-code-block-color)',
            transition: 'color .5s',
          },
        },
      },

      [`${componentCls}-fold`]: {
        position: 'sticky',
        insetInline: 0,
        insetBlockEnd: 0,
        zIndex: 10,
        overflow: 'hidden',
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        backgroundColor: token.colorBgContainer,
        marginInlineStart: 1,

        '&-button': {
          width: '100%',
          paddingBlock: token.paddingSM,
        },

        '&-text': {
          marginInlineStart: token.marginXXS,
        },
      },
    },
  };
});
