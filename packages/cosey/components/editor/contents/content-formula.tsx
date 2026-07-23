import { computed, defineComponent } from 'vue';
import katex from 'katex';
import { useEditor, useElement } from 'slate-vue3';
import { Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { createBem } from '../../../utils';

export default defineComponent({
  name: 'CoEditorContentFormula',
  props: {
    formula: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const bem = createBem('editor-content-formula');

    const mathml = computed(() =>
      katex.renderToString(props.formula, {
        throwOnError: false,
        output: 'mathml',
      }),
    );

    const editor = useEditor();

    const element = useElement();

    const isActive = computed(() => {
      return !!(
        editor.selection &&
        Range.isCollapsed(editor.selection) &&
        Range.surrounds(editor.range(DOMEditor.findPath(editor, element.value)), editor.selection)
      );
    });

    return () => {
      return (
        <span class={[bem.b(), bem.is('active', isActive.value)]}>
          <span v-html={mathml.value} contenteditable={false}></span>
          {slots.default?.()}
        </span>
      );
    };
  },
});
