<script lang="ts">
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldEditorProps, type FieldEditorSlots } from './editor.api';
import { addNullablePlaceholder } from '../../../../utils';
import { Editor } from '../../../editor';

export default defineComponent(
  (props: FieldEditorProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(Editor, props.componentProps, slots);
    };
  },
  {
    name: 'CoFieldEditor',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldEditorSlots>,
  },
);
</script>
