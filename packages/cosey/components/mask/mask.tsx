import { defineComponent } from 'vue';
import { maskEmits } from './mask.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoMask',
  emits: maskEmits,
  setup(_, { emit }) {
    const bem = createBem('mask');

    return () => {
      return <div class={bem.b()} onClick={(event) => emit('click', event)} />;
    };
  },
});
