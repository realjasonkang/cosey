<script lang="ts">
import { ElSwitch } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldSwitchProps, type FieldSwitchSlots } from './switch.api';

export default defineComponent(
  (props: FieldSwitchProps, { slots }) => {
    const componentProps = computed(() => props.componentProps || {});

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        const {
          activeValue = true,
          inactiveValue = false,
          activeText,
          inactiveText,
        } = componentProps.value;

        const result =
          value === activeValue ? (activeText ?? activeValue) : (inactiveText ?? inactiveValue);

        return String(result);
      }

      return h(
        ElSwitch,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldSwitch',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSwitchSlots>,
  },
);
</script>
