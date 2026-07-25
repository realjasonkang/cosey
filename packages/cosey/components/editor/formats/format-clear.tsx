import { defineComponent } from 'vue';
import { useEditor } from 'slate-vue3';
import { Icon } from '../../icon';
import Button from '../button';

export default defineComponent({
  name: 'CoEditorFormatClear',
  setup() {
    const editor = useEditor();

    const onClick = () => {
      editor.clearForamts();
    };

    return () => {
      return (
        <Button onClick={onClick}>
          <Icon name="co:text-clear-format" />
        </Button>
      );
    };
  },
});
