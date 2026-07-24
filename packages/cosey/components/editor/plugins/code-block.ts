import { h } from 'vue';
import { type RenderElementProps, toRawWeakMap, useInheritRef } from 'slate-vue3';
import { Editor, Element, Node, NodeEntry, Path, Range, Text } from 'slate-vue3/core';
import { CodeBlockElement, ParagraphElement } from '../types';
import ContentCodeBlock from '../contents/content-code-block';
import {
  tokenizeCodeSync,
  getCurrentTheme,
  onHighlighterReady,
  LANGUAGES,
  type HighlightLanguage,
  type ThemedToken,
} from '../../../utils/shiki';
import { Hotkeys } from './keyboard';
import {
  getRangePosition,
  getSortedRange,
  isNormalBlock,
  isPointAtEndOfElement,
  RangePosition,
} from '../utils';

export const languageOptions = LANGUAGES.map(({ id, label }) => ({ value: id, label }));

declare module 'slate-vue3/core' {
  interface BaseEditor {
    decorate: (nodeList: Node[]) => Range[];
    formatCodeBlock: () => void;
    isCodeBlockActive: () => boolean;
  }
}

function formatCodeBlock(editor: Editor) {
  if (!editor.selection) return;

  const isActive = editor.isCodeBlockActive();

  if (isActive) {
    editor.unwrapNodes({
      match: isCodeBlock,
      split: true,
    });
    editor.setNodes<ParagraphElement>(
      {
        type: 'paragraph',
      },
      { match: isCodeLine },
    );
  } else {
    editor.wrapNodes(
      { type: 'code-block', language: 'text', children: [] },
      { match: isNormalBlock },
    );
    editor.setNodes({ type: 'code-line' }, { match: isNormalBlock });
  }
}

/** Cache keyed by language + text content. */
const tokenCache = new Map<string, ThemedToken[][]>();

function getCacheKey(language: string, text: string): string {
  return `${getCurrentTheme()}::${language}::${text}`;
}

/**
 * Build decorations from shiki tokens for all code blocks in the editor.
 * All languages are preloaded at module init, so tokenization is always synchronous.
 */
function node2Decorations(editor: Editor) {
  const decorationsMap = new toRawWeakMap<Node, Range[]>();
  const blockEntries = editor.nodes({
    at: [],
    mode: 'highest',
    match: isCodeBlock,
  });

  Array.from(blockEntries).forEach(([block, blockPath]: NodeEntry<CodeBlockElement>) => {
    const blockChildren = Array.from(Node.children(editor, blockPath));
    const text = block.children.map((line) => Node.string(line)).join('\n');
    const cacheKey = getCacheKey(block.language, text);

    let tokens: ThemedToken[][] | null | undefined = tokenCache.get(cacheKey);
    if (!tokens) {
      tokens = tokenizeCodeSync(text, block.language as HighlightLanguage);
      if (tokens) tokenCache.set(cacheKey, tokens);
    }

    if (tokens) {
      applyTokensToDecorations(tokens, blockPath, blockChildren, decorationsMap);
    }
  });

  return decorationsMap;
}

/** Convert shiki ThemedToken[][] into Slate Range decorations for a single code block. */
function applyTokensToDecorations(
  lineTokens: ThemedToken[][],
  blockPath: Path,
  blockChildren: NodeEntry<Node>[],
  decorationsMap: toRawWeakMap<Node, Range[]>,
) {
  lineTokens.forEach((tokens, lineIndex) => {
    if (lineIndex >= blockChildren.length) return;

    const [element] = blockChildren[lineIndex];
    if (!decorationsMap.has(element)) {
      decorationsMap.set(element, []);
    }

    const ranges = decorationsMap.get(element)!;
    let offset = 0;

    tokens.forEach((token) => {
      const length = token.content.length;
      if (!length) return;

      ranges.push({
        anchor: { path: [...blockPath, lineIndex, 0], offset },
        focus: { path: [...blockPath, lineIndex, 0], offset: offset + length },
        token: true,
        tokenColor: token.color,
        tokenBgColor: token.bgColor,
        tokenFontStyle: token.fontStyle,
      } as Range);

      offset += length;
    });
  });
}

function decorate(editor: Editor, nodeList: Node[]) {
  const node = nodeList[0];
  if (isCodeLine(node)) {
    return node2Decorations(editor).get(node) || [];
  }
  return [];
}

function formatIndent(editor: Editor, value: number) {
  const codeLineNodes = Array.from(
    editor.nodes({
      match: isCodeLine,
    }),
  );

  function shouldInsert() {
    const range = getSortedRange(editor.selection!);
    if (codeLineNodes.length === 1) {
      const pos = getRangePosition(editor.range(codeLineNodes[0][1]), range);
      return (
        pos === RangePosition.CONTAIN ||
        pos === RangePosition.AFTER_BEGIN ||
        pos === RangePosition.BEFORE_END
      );
    }
    return false;
  }

  if (codeLineNodes.length > 0) {
    const selection = editor.selection!;

    if (Range.isCollapsed(selection) || shouldInsert()) {
      if (value === 1) {
        Editor.insertText(editor, '  ');
      }
    } else {
      codeLineNodes.forEach(([, path]) => {
        const firstNode = Node.first(editor, path);
        if (Text.isText(firstNode[0])) {
          const text = firstNode[0].text;

          if (value === 1) {
            editor.insertText('  ', {
              at: editor.start(firstNode[1]),
            });
          } else {
            const blankNum = Math.min(text.match(/^ +/)?.[0].length || 0, 2);
            if (blankNum > 0) {
              editor.delete({
                at: {
                  anchor: {
                    path: firstNode[1],
                    offset: 0,
                  },
                  focus: {
                    path: firstNode[1],
                    offset: blankNum,
                  },
                },
              });
            }
          }
        }
      });
    }
  }
}

function onKeydown(editor: Editor, event: KeyboardEvent) {
  if (Hotkeys.isSoftBreak(event)) {
    if (
      isPointAtEndOfElement(editor, 'code-block', ([, path]) => {
        editor.insertNodes(
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
          {
            at: Path.next(path),
          },
        );
        editor.move();
      })
    ) {
      event.preventDefault();
      return true;
    }
  }
}

function isCodeBlock(element: unknown): element is CodeBlockElement {
  return Element.isElementType(element, 'code-block');
}

function isCodeLine(element: unknown): element is CodeBlockElement {
  return Element.isElementType(element, 'code-line');
}

/**
 * code-block 只允许包含 code-line 节点；
 * 其他类型节点会替换为 code-line，后者内容为前者的内容字符串。
 */
function normalizeCodeBlock(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isCodeBlock(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!isCodeLine(childNode)) {
      const text = editor.string(childPath);
      editor.removeNodes({
        at: childPath,
      });
      editor.insertNodes(
        {
          type: 'code-line',
          children: [{ text }],
        },
        {
          at: childPath,
        },
      );

      return true;
    }
  }
}

/**
 * code-line 只允许包含文本节点，其他类型节点会被转换为文本节点;
 * code-line 父节点只能是 code-block，否则转换为 paragraph。
 */
function normalizeCodeLine(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isCodeLine(node)) return;

  if (!isCodeBlock(Node.parent(editor, path))) {
    editor.setNodes(
      {
        type: 'paragraph',
      },
      {
        at: path,
      },
    );
    return true;
  }

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!Text.isText(childNode)) {
      const text = editor.string(childPath);
      editor.removeNodes({
        at: childPath,
      });
      editor.insertNodes(
        {
          text,
        },
        {
          at: childPath,
        },
      );

      return true;
    }
  }
}

function normalizeNode(editor: Editor, entry: NodeEntry<Node>) {
  return normalizeCodeBlock(editor, entry) || normalizeCodeLine(editor, entry);
}

function isCodeBlockActive(editor: Editor) {
  if (!editor.selection) return false;

  const nodes = editor.nodes({
    at: editor.edges(editor.selection)[0],
    match: isCodeBlock,
  });

  return !nodes.next().done;
}

export function withCodeBlock(editor: Editor) {
  const {
    renderElement,
    formatIndent: srcFormatIndent,
    onKeydown: srcOnKeydown,
    normalizeNode: srcNormalizeNode,
  } = editor;

  editor.decorate = (nodeList: Node[]) => {
    return decorate(editor, nodeList);
  };

  editor.formatCodeBlock = () => {
    formatCodeBlock(editor);
  };

  editor.renderElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props;

    if (element.type === 'code-block') {
      return h(
        ContentCodeBlock,
        {
          ...useInheritRef(attributes),
          language: element.language,
        },
        () => children,
      );
    }
    if (element.type === 'code-line') {
      return h('div', { ...attributes, style: { position: 'relative' } }, children);
    }

    return renderElement(props);
  };

  editor.formatIndent = (value: number) => {
    formatIndent(editor, value);
    return srcFormatIndent(value);
  };

  editor.onKeydown = (event: KeyboardEvent) => {
    if (!onKeydown(editor, event)) {
      srcOnKeydown(event);
    }
  };

  editor.normalizeNode = (entry, options) => {
    if (!normalizeNode(editor, entry)) {
      srcNormalizeNode(entry, options);
    }
  };

  editor.isCodeBlockActive = () => {
    return isCodeBlockActive(editor);
  };

  // Once shiki finishes loading all languages, trigger a re-render
  // so any code blocks that were rendered before shiki was ready get highlighted.
  onHighlighterReady(() => editor.onChange());

  return editor;
}
