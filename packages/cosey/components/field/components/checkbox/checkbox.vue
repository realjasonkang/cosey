<script lang="ts">
import { ElCheckbox } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldCheckboxProps, type FieldCheckboxSlots } from './checkbox.api';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldCheckboxProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => String(val));
      }

      return h(
        ElCheckbox,
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
    name: 'CoFieldCheckbox',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldCheckboxSlots>,
  },
);
</script>
