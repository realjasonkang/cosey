import { computed, defineComponent } from 'vue';
import { containerProps, containerSlots, useContainer } from './container.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoContainer',
  props: containerProps,
  slots: containerSlots,
  setup(props, { slots }) {
    const bem = createBem('container');

    const context = useContainer();

    const height = computed(() => {
      return props.fullPage ? context?.height || '100vh' : undefined;
    });

    return () => {
      return (
        <div class={bem.b()} style={{ height: height.value }}>
          {slots.default?.({})}
        </div>
      );
    };
  },
});
