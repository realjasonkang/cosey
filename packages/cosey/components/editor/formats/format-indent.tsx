import { useEditor } from 'slate-vue3';
import { defineComponent } from 'vue';
import { Icon } from '../../icon';
import Button from '../button';

export default defineComponent({
  name: 'CoEditorFormatIndent',
  props: {
    icon: { type: String, required: true },
    delta: { type: Number, required: true },
  },
  setup(props) {
    const editor = useEditor();

    const onClick = () => {
      editor.formatIndent(props.delta);
    };

    return () => {
      return (
        <Button onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
