<script lang="ts">
import { ElSegmented } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldSegmentedProps, type FieldSegmentedSlots } from './segmented.api';
import { getLabelByValue, addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldSegmentedProps, { slots }) => {
    const componentProps = computed(() => props.componentProps || {});

    const convertedOptions = computed(() => {
      return (componentProps.value.options ?? []).map((option) => {
        if (typeof option === 'object') {
          return option;
        }
        return {
          label: option,
          value: option,
        };
      });
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => getLabelByValue(convertedOptions.value, val));
      }

      return h(
        ElSegmented,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          componentProps.value,
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldSegmented',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSegmentedSlots>,
  },
);
</script>
