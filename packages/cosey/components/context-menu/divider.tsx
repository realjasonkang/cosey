import { defineComponent } from 'vue';
import { createBem } from '../../utils';

export default defineComponent({
  setup() {
    const bem = createBem('context-menu');

    return () => {
      return <div class={bem.e('divider')}></div>;
    };
  },
});
