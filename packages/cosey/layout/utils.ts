import { type Component, defineComponent, h } from 'vue';
import { LayoutComponents, useGlobalConfig } from '../config';
import { useOptionalComponent } from '../hooks';

export function mergedLayout(name: keyof LayoutComponents, defaultComponent: Component) {
  return defineComponent({
    setup(props, { slots }) {
      const { components } = useGlobalConfig();
      const component = useOptionalComponent(() => components?.[name], defaultComponent);

      return () => h(component.value, props, slots);
    },
  });
}
