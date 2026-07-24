/**
 * Shared shiki — single source of truth for languages, themes, highlighter, tokenization.
 */
import { createHighlighter } from 'shiki';
import type { Highlighter, ThemedToken } from 'shiki';

// ---- Themes ----

export const THEME_DARK = 'dark-plus';
export const THEME_LIGHT = 'light-plus';

export function getCurrentTheme(): string {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return THEME_DARK;
  }
  return THEME_LIGHT;
}

// ---- Languages ----

export const LANGUAGES = [
  { id: 'text', label: 'PlainText' },
  { id: 'css', label: 'CSS' },
  { id: 'less', label: 'Less' },
  { id: 'scss', label: 'Scss' },
  { id: 'html', label: 'HTML' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'jsx', label: 'JSX' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'tsx', label: 'TSX' },
  { id: 'json', label: 'JSON' },
  { id: 'json5', label: 'JSON5' },
  { id: 'markdown', label: 'Markdown' },
  { id: 'php', label: 'PHP' },
  { id: 'bash', label: 'Bash' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
  { id: 'sql', label: 'SQL' },
  { id: 'c', label: 'C' },
  { id: 'nginx', label: 'Nginx' },
] as const;

export type ShikiLangId = (typeof LANGUAGES)[number]['id'];

// ---- Highlighter singleton ----

const PRELOAD_LANGS = LANGUAGES.map((l) => l.id).filter((id) => id !== 'text');

let highlighter: Highlighter | null = null;
const highlighterReady = createHighlighter({
  themes: [THEME_DARK, THEME_LIGHT],
  langs: PRELOAD_LANGS as string[],
})
  .then((hl) => {
    highlighter = hl;
    return hl;
  })
  .catch((err) => {
    console.error('[cosey shiki] init failed:', err);
    throw err;
  });

export function getHighlighter(): Highlighter | null {
  return highlighter;
}

export function onHighlighterReady(cb: () => void): void {
  if (highlighter) {
    cb();
  } else {
    highlighterReady.then(cb);
  }
}

// ---- Tokenization ----

export type { ThemedToken };
export type HighlightLanguage = ShikiLangId;

function plainTextTokens(code: string): ThemedToken[][] {
  return code.split('\n').map((line, i, arr) => {
    const content = i < arr.length - 1 ? line + '\n' : line;
    return content.length > 0
      ? [{ content, offset: 0, color: undefined, fontStyle: 0 } as ThemedToken]
      : [{ content: '\n', offset: 0, color: undefined, fontStyle: 0 } as ThemedToken];
  });
}

export function tokenizeCodeSync(
  code: string,
  language: HighlightLanguage,
): ThemedToken[][] | null {
  if (language === 'text') return plainTextTokens(code);
  const hl = getHighlighter();
  if (!hl) return null;
  return hl.codeToTokens(code, { lang: language as any, theme: getCurrentTheme() }).tokens;
}
