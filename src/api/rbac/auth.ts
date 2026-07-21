import { AxiosResponse } from 'axios';
import { http, persist } from 'cosey';

const Api = {
  Login: '/rbac/auth/login',
  Captcha: '/rbac/auth/captcha',
  UserInfo: '/rbac/auth/info',
  ChangePassword: '/rbac/auth/change-password',
  RefreshToken: '/rbac/auth/refresh-token',
};

const REFRESH_TOKEN = 'REFRESH_TOKEN';

export default {
  login: async (data: any) => {
    const { accessToken, refreshToken } = await http.post<{
      accessToken: string;
      refreshToken: string;
    }>(Api.Login, data);

    persist.set(REFRESH_TOKEN, refreshToken);
    return accessToken;
  },

  captcha: () => {
    return http.get(Api.Captcha, {});
  },

  getUserInfo: () => {
    return http.get<{
      id: number;
      username: string;
      nickname: string;
      avatar: string;
      superAdmin: boolean;
      permissions: any[];
    }>(Api.UserInfo);
  },

  changePassword: (data: any) => {
    return http.post(Api.ChangePassword, data);
  },

  refreshToken: async () => {
    const { accessToken, refreshToken } = await http.post(Api.RefreshToken, {
      refreshToken: persist.get(REFRESH_TOKEN),
    });

    persist.set(REFRESH_TOKEN, refreshToken);
    return accessToken;
  },

  isAccessTokenExpired: (response: AxiosResponse<any, any>) => {
    return response.data.type === 'accessToken';
  },
};
