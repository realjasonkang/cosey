import { defineComponent } from 'vue';
import { createBem } from '../../../utils';

export default defineComponent({
  name: 'CoEditorContentPlaceholder',
  setup(_props, { slots }) {
    const bem = createBem('editor-content-placeholder');

    return () => {
      return <div class={bem.b()}>{slots.default?.()}</div>;
    };
  },
});
