<script lang="ts">
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldRadioGroupProps, type FieldRadioGroupSlots } from './radio-group.api';
import { getLabelByValue, addNullablePlaceholder } from '../../../../utils';
import { useProps } from '../../../../hooks';

export default defineComponent(
  (props: FieldRadioGroupProps) => {
    const componentProps = computed(() => props.componentProps || {});

    const { getLabel, getValue } = useProps(componentProps);

    const convertedOptions = computed(() => {
      return (componentProps.value.options ?? []).map((option) => {
        if (typeof option === 'object') {
          return {
            ...option,
            label: getLabel(option),
            value: getValue(option),
          };
        }
        return {
          label: option,
          value: option,
        };
      });
    });

    const radioType = computed(() => {
      return componentProps.value.type === 'button' ? ElRadioButton : ElRadio;
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => getLabelByValue(convertedOptions.value, val));
      }

      return h(
        ElRadioGroup,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps ?? {},
        ),
        () =>
          convertedOptions.value.map((item) =>
            h(radioType.value, {
              ...item,
              key: item.value as string | number,
            }),
          ),
      );
    };
  },
  {
    name: 'CoFieldRadio',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldRadioGroupSlots>,
  },
);
</script>
