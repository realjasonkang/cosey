import { defineComponent, PropType } from 'vue';
import { createBem } from '../../../utils';
import { getCssVar } from '../../../utils';

export default defineComponent({
  name: 'CoEditorContentListItem',
  props: {
    level: {
      type: Number,
      required: true,
    },
    listType: {
      type: String as PropType<'bulleted-list' | 'numbered-list'>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const bem = createBem('editor-content-list-item');

    return () => {
      return (
        <li
          class={[bem.b(), bem.is(props.listType), bem.is(`level-${props.level}`)]}
          style={{
            marginLeft: `calc(${props.level + 1} * ${getCssVar('padding-xl')})`,
          }}
        >
          {slots.default?.()}
        </li>
      );
    };
  },
});
