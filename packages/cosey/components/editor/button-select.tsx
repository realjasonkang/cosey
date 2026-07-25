import { defineComponent, inject, onMounted, useTemplateRef } from 'vue';
import { createBem } from '../../utils';
import { Icon } from '../icon';
import { pickerContextKey } from './formats/picker.api';

export default defineComponent({
  name: 'CoEditorButtonSelect',
  props: {
    width: { type: String },
  },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { slots, emit }) {
    const bem = createBem('editor-button');

    const buttonRef = useTemplateRef('button');

    const pickerContext = inject(pickerContextKey, null);

    onMounted(() => {
      if (pickerContext) {
        pickerContext.triggerTarget.value = buttonRef.value as HTMLElement;
      }
    });

    return () => {
      return (
        <button
          ref="button"
          type="button"
          class={[bem.b(), bem.e('select')]}
          style={{ width: props.width }}
          onMousedown={(event) => event.preventDefault()}
          onClick={(event) => emit('click', event)}
        >
          <div class={bem.e('text')}>{slots.default?.()}</div>
          <Icon class={bem.e('arrow')} name="co:chevron-down" size="lg" />
        </button>
      );
    };
  },
});
