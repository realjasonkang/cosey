import { defineComponent } from 'vue';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoEditorButtonGroup',
  setup(_, { slots }) {
    const bem = createBem('editor-button');
    return () => {
      return <div class={bem.e('group')}>{slots.default?.()}</div>;
    };
  },
});
