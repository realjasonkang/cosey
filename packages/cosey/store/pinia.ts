import { createPinia } from 'pinia';
import { App } from 'vue';
import { piniaPluginPersist } from './plugin';

export { piniaPluginPersist } from './plugin';

export let pinia: ReturnType<typeof createPinia>;

export function launchStore(app: App) {
  pinia = createPinia();
  pinia.use(piniaPluginPersist);

  app.use(pinia);
}
