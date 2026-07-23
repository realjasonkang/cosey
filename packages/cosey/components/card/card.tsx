import { defineComponent } from 'vue';
import { cardEmits, cardProps, cardSlots } from './card.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoCard',
  props: cardProps,
  slots: cardSlots,
  emits: cardEmits,
  setup(_props, { slots }) {
    const bem = createBem('card');

    return () => {
      return <div class={bem.b()}>{slots.default?.({})}</div>;
    };
  },
});
