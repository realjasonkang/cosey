import { computed, defineComponent } from 'vue';
import { ribbonProps, ribbonSlots, ribbonEmits } from './ribbon.api';
import { getCssVar } from '../../utils';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoRibbon',
  props: ribbonProps,
  slots: ribbonSlots,
  emits: ribbonEmits,
  setup(props, { slots }) {
    const bem = createBem('ribbon');

    const ribbon = computed(() => {
      return {
        width: props.size + 'px',
        height: props.size + 'px',
        '--gap': props.gap + 'px',
        '--bg': props.background || getCssVar('color-primary'),
      };
    });

    const silkStyle = computed(() => {
      const hypotenuse = Math.sqrt(Math.pow(props.size, 2) * 2);
      const breadth = (hypotenuse / 2) * props.breadth;

      return {
        width: hypotenuse + 'px',
        height: breadth + 'px',
        color: props.color,
      };
    });

    return () => {
      return (
        <div class={[bem.b(), bem.is(props.direction)]} style={ribbon.value}>
          <div class={bem.e('silk')} style={silkStyle.value}>
            {slots.default?.({})}
          </div>
        </div>
      );
    };
  },
});
