import { computed, defineComponent, type PropType } from 'vue';
import { useEditor, useElement } from 'slate-vue3';
import { Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { useObjectUrl } from '../../../hooks';
import { createBem } from '../../../utils';
import Resize from './resize';
import Upload from './upload';

export default defineComponent({
  name: 'CoEditorContentImage',
  props: {
    url: {
      type: String,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    file: {
      type: Object as PropType<File>,
    },
  },
  setup(props, { slots }) {
    const bem = createBem('editor-content-image');

    const editor = useEditor();

    const element = useElement();

    const objectUrl = useObjectUrl(() => props.file);
    const mergedUrl = computed(() => props.url || objectUrl.value);

    const isActive = computed(() => {
      return !!(
        editor.selection &&
        Range.isCollapsed(editor.selection) &&
        Range.surrounds(editor.range(DOMEditor.findPath(editor, element.value)), editor.selection)
      );
    });

    const onClick = () => {
      editor.select(DOMEditor.findPath(editor, element.value));
    };

    // resize
    const onResize = ({ width, height }: { width: number; height: number }) => {
      editor.setNodes(
        {
          width,
          height,
        },
        {
          at: DOMEditor.findPath(editor, element.value),
        },
      );
    };

    // upload
    const onSuccess = (url: string) => {
      editor.setNodes(
        {
          url,
          file: undefined,
        },
        {
          at: DOMEditor.findPath(editor, element.value),
        },
      );
    };

    return () => {
      return (
        <div class={[bem.b(), bem.is('active', isActive.value)]} onClick={onClick}>
          <div class={bem.e('wrapper')}>
            <img src={mergedUrl.value} width={props.width} height={props.height} />
            <Resize visible={isActive.value} onResize={onResize} />
            {props.file && <Upload file={props.file} onSuccess={onSuccess} />}
          </div>
          {slots.default?.()}
        </div>
      );
    };
  },
});
