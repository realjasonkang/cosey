<script lang="ts">
import { ElTransfer } from 'element-plus';
import { computed, defineComponent, h, type SlotsType } from 'vue';
import { type FieldTransferProps, type FieldTransferSlots } from './transfer.api';
import { getLabelByValue, addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldTransferProps, { slots }) => {
    const componentProps = computed(() => {
      return props.componentProps ?? {};
    });

    const mergedOptionProps = computed(() => {
      const { label = 'label', key = 'key' } = componentProps.value.props ?? {};
      return {
        label: label,
        value: key,
      };
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => {
          const label = getLabelByValue(
            componentProps.value.data ?? [],
            val,
            mergedOptionProps.value,
          );
          return Array.isArray(label) ? label.join(', ') : (label as string);
        });
      }

      return h(ElTransfer, componentProps.value, slots);
    };
  },
  {
    name: 'CoFieldTransfer',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTransferSlots>,
  },
);
</script>
