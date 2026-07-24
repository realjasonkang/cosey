import { type CSSProperties, h, VNode } from 'vue';
import { type RenderElementProps, type RenderLeafProps } from 'slate-vue3';
import { Editor } from 'slate-vue3/core';
import { mapElementTypeTagName } from '../types';

export const INDENT_DELTA = 40;

declare module 'slate-vue3/core' {
  interface BaseEditor {
    renderElement: (props: RenderElementProps) => VNode;
    renderLeaf: (props: RenderLeafProps) => VNode;
  }
}

const renderElement = ({ attributes: attrs, children, element }: RenderElementProps) => {
  const attributes = {
    ...attrs,
    style: {
      textAlign: 'align' in element ? element.align : undefined,
      paddingLeft:
        'indent' in element && element.indent ? element.indent * INDENT_DELTA + 'px' : '',
    } as CSSProperties,
  };

  const tagName = mapElementTypeTagName[element.type] || mapElementTypeTagName.paragraph;
  return h(tagName, attributes, children);
};

const renderLeaf = ({ leaf, attributes, children }: RenderLeafProps) => {
  const {
    text,
    bold,
    italic,
    underline,
    strikethrough,
    code,
    superscript,
    subscript,
    font,
    size,
    color,
    background,
    // Shiki token decorations
    tokenColor,
    tokenFontStyle,
    tokenBgColor,
    ...rest
  } = leaf;

  const style: CSSProperties = {
    fontWeight: bold || (tokenFontStyle as number & 2) ? 'bold' : undefined,
    fontStyle: italic || (tokenFontStyle as number & 1) ? 'italic' : undefined,
    textDecoration: strikethrough
      ? 'line-through'
      : (tokenFontStyle as number & 4)
        ? 'underline'
        : underline
          ? 'underline'
          : undefined,
    fontFamily: font ? font : undefined,
    fontSize: size ? size : undefined,
    color: color ? color : (tokenColor as string) || undefined,
    background: background ? background : (tokenBgColor as string) || undefined,
  };

  // If underline is from user formatting (not token), use borderBottom
  if (underline && !(tokenFontStyle as number & 4) && !strikethrough) {
    style.textDecoration = undefined;
    style.borderBottom = '1px solid black';
  }

  void text;

  return h(
    code ? 'code' : superscript ? 'sup' : subscript ? 'sub' : 'span',
    { ...attributes, style, class: Object.keys(rest).join(' ') },
    children,
  );
};

export function withRender(editor: Editor) {
  editor.renderLeaf = renderLeaf;
  editor.renderElement = renderElement;

  return editor;
}
