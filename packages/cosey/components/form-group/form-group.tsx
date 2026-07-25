import { computed, defineComponent, ref, watch } from 'vue';
import { formGroupEmits, formGroupProps, formGroupSlots } from './form-group.api';
import { reactiveOmit } from '@vueuse/core';
import { Icon } from '../icon';
import { ElTooltip } from 'element-plus';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoFormGroup',
  props: formGroupProps,
  slots: formGroupSlots,
  emits: formGroupEmits,
  setup(props, { slots, emit }) {
    const bem = createBem('form-group');

    const spaceProps = reactiveOmit(props, [
      'title',
      'tooltip',
      'borderStyle',
      'position',
      'collapsible',
      'collapsed',
    ]);

    const innerCollapsed = ref(false);

    const isBordered = computed(() => !!props.title);

    watch(
      () => props.collapsed,
      () => {
        innerCollapsed.value = !!props.collapsed;
      },
      {
        immediate: true,
      },
    );

    const handleToggle = () => {
      if (props.collapsible) {
        innerCollapsed.value = !innerCollapsed.value;
        emit('update:collapsed', innerCollapsed.value);
      }
    };

    return () => {
      return (
        <div
          class={[
            bem.b(),
            bem.is('bordered', isBordered.value),
            bem.is('collapsed', innerCollapsed.value),
          ]}
          style={{
            borderStyle: isBordered.value ? props.borderStyle : undefined,
          }}
        >
          {(props.title || slots.title) && (
            <div class={[bem.e('title'), bem.is(props.position)]}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: props.collapsible ? 'pointer' : '',
                }}
                onClick={handleToggle}
              >
                {props.collapsible && (
                  <Icon name={innerCollapsed.value ? 'co:caret-up' : 'co:caret-down'} size="xl" />
                )}
                {props.title || slots.title?.()}
                {(props.tooltip || slots.tooltip) && (
                  <ElTooltip
                    placement="top"
                    v-slots={{
                      content: () => props.tooltip || slots.tooltip?.(),
                      default: () => <Icon name="co:help" class={bem.e('title-icon')} size="md" />,
                    }}
                  />
                )}
              </div>
            </div>
          )}

          <el-space v-show={!innerCollapsed.value} {...spaceProps} class={bem.e('space')}>
            {slots.default?.({})}
          </el-space>
        </div>
      );
    };
  },
});
