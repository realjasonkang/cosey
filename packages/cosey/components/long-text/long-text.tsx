import { computed, defineComponent } from 'vue';
import { ElScrollbar, ElTooltip } from 'element-plus';
import { longTextProps, longTextSlots } from './long-text.api';
import { addPxUnit, createBem } from '../../utils';
import Copy from '../copy';

export default defineComponent({
  name: 'CoLongText',
  props: longTextProps,
  slots: longTextSlots,
  setup(props, { slots }) {
    const bem = createBem('long-text');

    const textStyle = computed(() => {
      return {
        '-webkit-line-clamp': props.rows,
      };
    });

    return () => {
      return (
        <ElTooltip
          placement="top"
          showAfter={200}
          v-slots={{
            default: () => (
              <div class={bem.b()} style={textStyle.value}>
                {props.text || slots.default?.({})}
              </div>
            ),
            content: () => (
              <div class={bem.e('tooltip')}>
                <ElScrollbar
                  class={bem.e('scrollbar')}
                  maxHeight={props.maxHeight}
                  style={{ maxWidth: addPxUnit(props.maxWidth) }}
                  always
                >
                  {props.text || slots.default?.({})}
                </ElScrollbar>
                <Copy text={props.text} color="inherit" class={bem.e('copy')} />
              </div>
            ),
          }}
        />
      );
    };
  },
});
