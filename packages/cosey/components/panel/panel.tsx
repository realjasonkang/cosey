import { defineComponent } from 'vue';
import { ElScrollbar } from 'element-plus';
import { panelProps, panelSlots } from './panel.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoPanel',
  props: panelProps,
  slots: panelSlots,
  setup(props, { slots }) {
    const bem = createBem('panel');

    return () => {
      return (
        <div class={bem.b()}>
          {(slots.header || props.header) && (
            <div class={bem.e('header')}>{slots.header ? slots.header() : props.header}</div>
          )}
          <ElScrollbar always maxHeight={props.maxHeight}>
            <div class={bem.e('body')}>{slots.default?.()}</div>
          </ElScrollbar>
        </div>
      );
    };
  },
});
