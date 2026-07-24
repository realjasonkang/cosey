import type { ExtractPropTypes, ExtractPublicPropTypes, PropType, SlotsType } from 'vue';
import { getHighlighter, getCurrentTheme, type ShikiLangId } from '../../utils/shiki';

type LangText = 'plain' | 'plaintext' | 'text' | 'txt';
type LangXml = 'markup' | 'html' | 'mathml' | 'svg' | 'xml' | 'ssml' | 'atom' | 'rss';
type LangCss = 'css' | 'less' | 'sass' | 'scss';
type LangJs = 'javascript' | 'js' | 'typescript' | 'ts' | 'jsx' | 'tsx';
type LangJson = 'json' | 'json5';
type LangMd = 'markdown' | 'md';
type LangBash = 'bash' | 'sh' | 'shell';
type LangPython = 'python' | 'py';

type Lang =
  | LangText
  | LangXml
  | LangCss
  | LangJs
  | 'clike'
  | LangJson
  | LangMd
  | LangBash
  | 'nginx'
  | 'php'
  | 'java'
  | 'sql'
  | LangPython;

const LANG_ALIAS_MAP: Record<string, ShikiLangId> = {
  plain: 'text',
  plaintext: 'text',
  txt: 'text',
  markup: 'html',
  mathml: 'html',
  svg: 'html',
  xml: 'html',
  ssml: 'html',
  atom: 'html',
  rss: 'html',
  js: 'javascript',
  ts: 'typescript',
  md: 'markdown',
  sh: 'bash',
  shell: 'bash',
  py: 'python',
  sass: 'scss',
  clike: 'c',
};

export function highlightCode(code: string, lang: string): string {
  if (!code) return '';
  const shikiLang = LANG_ALIAS_MAP[lang] || lang;
  if (shikiLang === 'text') return escapeHtml(code);

  const hl = getHighlighter();
  if (!hl) return escapeHtml(code);

  try {
    return hl.codeToHtml(code, { lang: shikiLang as any, theme: getCurrentTheme() });
  } catch {
    return escapeHtml(code);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const highlightProps = {
  code: {
    type: String,
  },
  lang: {
    type: String as PropType<Lang | (string & {})>,
    default: 'text',
  },
  maxHeight: {
    type: String,
  },
};

export type HighlightProps = ExtractPropTypes<typeof highlightProps>;
export type HighlightPublicProps = ExtractPublicPropTypes<typeof highlightProps>;

export interface HighlightSlots {
  default: {};
}

export const highlightSlots = Object as SlotsType<HighlightSlots>;

export interface HighlightEmits {}

export interface HighlightExpose {}
