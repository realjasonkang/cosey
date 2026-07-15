import { pinia, piniaPluginPersist, launchStore } from './pinia';
import { useLayoutStore, useOuterLayoutStore } from './layout';
import { type UserInfo, useUserStore, useOuterUserStore } from './user';

export {
  type UserInfo,
  pinia,
  piniaPluginPersist,
  launchStore,
  useUserStore,
  useOuterUserStore,
  useLayoutStore,
  useOuterLayoutStore,
};
