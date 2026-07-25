import { computed, defineComponent } from 'vue';
import { useEditor } from 'slate-vue3';
import { Icon } from '../../icon';
import Button from '../button';

export default defineComponent({
  name: 'CoEditorFormatBlockQuote',
  setup() {
    const editor = useEditor();

    const isActive = computed(() => editor.isBlockQuoteActive());

    const onClick = () => {
      editor.formatBlockQuote();
    };

    return () => {
      return (
        <Button active={isActive.value} onClick={onClick}>
          <Icon name="co:quotes" />
        </Button>
      );
    };
  },
});
