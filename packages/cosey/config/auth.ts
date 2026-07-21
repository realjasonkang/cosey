import type { DeepPartial } from '../types/helper';

/**
 * 认证相关配置
 */
export const defaultAuthConfig = {
  /**
   * 登录时是否需要验证码
   */
  captcha: false,
};

export type AuthConfig = DeepPartial<typeof defaultAuthConfig>;
export type RequiredAuthConfig = typeof defaultAuthConfig;
