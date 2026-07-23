import { TinyColor } from '@ctrl/tinycolor';

/** 预设主题色的种子值 */
export const defaultPresetColors: Record<string, string> = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1677FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
};

/**
 * 生成颜色色板（10个色阶）
 * 基于 Ant Design 的色板生成算法
 */
export function generate(color: string): string[] {
  const hsv = new TinyColor(color).toHsv();
  const colors: string[] = [];

  for (let i = 0; i < 10; i++) {
    const h = hsv.h;
    const s = i < 5 ? Math.max(0, hsv.s - (4 - i) * 0.1) : Math.min(1, hsv.s + (i - 5) * 0.05);
    const v = i < 5 ? Math.min(1, hsv.v + (4 - i) * 0.1) : Math.max(0, hsv.v - (i - 5) * 0.15);
    colors[i] = new TinyColor({ h, s, v }).toHexString();
  }

  return colors;
}

/**
 * 将颜色与白色混合，ratio 为 0-100
 */
export function getSolidColor(color: string, ratio: number): string {
  return new TinyColor(color).mix('#fff', ratio).toHexString();
}
