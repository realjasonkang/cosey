import { isString } from '../utils';
import { computed, resolveComponent, type Component } from 'vue';

export function useOptionalComponent(
  component: () => string | Component | undefined,
  defaultComponent: Component,
) {
  return computed(() => {
    const comp = component();
    return comp ? (isString(comp) ? resolveComponent(comp) : comp) : defaultComponent;
  });
}
