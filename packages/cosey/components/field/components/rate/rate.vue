<script lang="ts">
import { ElRate } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldRateProps, type FieldRateSlots } from './rate.api';

export default defineComponent(
  (props: FieldRateProps, { slots }) => {
    const mergedDisabled = computed(() => {
      return props.readonly || props.componentProps?.disabled;
    });

    return () => {
      return h(
        ElRate,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps ?? {},
          {
            disabled: mergedDisabled.value,
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldRate',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldRateSlots>,
  },
);
</script>
