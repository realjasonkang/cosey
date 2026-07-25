import { defineComponent } from 'vue';
import { useEditor } from 'slate-vue3';
import { Icon } from '../../icon';
import Button from '../button';
import { useMarkActive } from '../hooks/useMarkActive';

export default defineComponent({
  name: 'CoEditorFormatMark',
  props: {
    icon: { type: String, required: true },
    format: { type: String, required: true },
  },
  setup(props) {
    const editor = useEditor();

    const isMarkActive = useMarkActive(props.format);

    const onClick = () => {
      editor.formatMark(props.format);
    };

    return () => {
      return (
        <Button active={isMarkActive.value} onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
