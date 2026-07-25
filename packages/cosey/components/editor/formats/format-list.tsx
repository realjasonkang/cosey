import { computed, defineComponent, PropType } from 'vue';
import { useEditor } from 'slate-vue3';
import { Icon } from '../../icon';
import Button from '../button';
import { type ListType } from '../types';

export default defineComponent({
  name: 'CoEditorFormatList',
  props: {
    icon: { type: String, required: true },
    format: { type: String as PropType<ListType>, required: true },
  },
  setup(props) {
    const editor = useEditor();

    const isListActive = computed(() => {
      return editor.getListTypeAtStartPoint() === props.format;
    });

    const onClick = () => {
      editor.formatList(props.format);
    };

    return () => {
      return (
        <Button active={isListActive.value} onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
