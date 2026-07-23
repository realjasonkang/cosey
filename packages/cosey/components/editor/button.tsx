import { defineComponent, useTemplateRef } from 'vue';
import { createBem } from '../../utils';

export interface EditorButtonExpose {
  el?: HTMLButtonElement;
}

export default defineComponent({
  name: 'CoEditorButton',
  props: { active: { type: Boolean } },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { slots, emit, expose }) {
    const bem = createBem('editor-button');

    const buttonRef = useTemplateRef('button');

    expose({
      el: buttonRef,
    });

    return () => {
      return (
        <button
          ref="button"
          type="button"
          class={[bem.b(), bem.is('active', props.active)]}
          onClick={(event) => emit('click', event)}
          onMousedown={(event) => event.preventDefault()}
        >
          {slots.default?.()}
        </button>
      );
    };
  },
});
