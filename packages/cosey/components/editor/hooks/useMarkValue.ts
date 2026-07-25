import { useEditor } from 'slate-vue3';
import { Editor } from 'slate-vue3/core';
import { ref, watch } from 'vue';

export function useMarkValue(mark: string, initial: boolean | number | string = '') {
  const editor = useEditor();

  const current = ref(initial);

  watch(
    () => editor.selection,
    () => {
      const marks = Editor.marks(editor);
      current.value = marks ? marks[mark as keyof typeof marks] || '' : '';
    },
    {
      deep: true,
    },
  );

  return current;
}
