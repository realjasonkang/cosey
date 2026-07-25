<script lang="tsx">
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus';
import { defineComponent, computed, h, type SlotsType, mergeProps } from 'vue';
import {
  fieldCheckboxGroupOmitKeys,
  type FieldCheckboxGroupProps,
  type FieldCheckboxGroupSlots,
} from './checkbox-group.api';

import { getLabelByValue, addNullablePlaceholder, isNumber, isFunction } from '../../../../utils';
import Panel from './panel.vue';
import { omit } from 'lodash-es';
import { useProps } from '../../../../hooks';

export default defineComponent(
  (props: FieldCheckboxGroupProps, { slots }) => {
    const componentProps = computed(() => props.componentProps || {});
    const checkboxGroupProps = computed(() => {
      return omit(componentProps.value, fieldCheckboxGroupOmitKeys);
    });

    const { getLabel, getValue, getKey } = useProps(componentProps);

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

    const checkboxType = computed(() => {
      return componentProps.value.type === 'button' ? ElCheckboxButton : ElCheckbox;
    });

    const checkboxWidth = computed(() => {
      const width = componentProps.value.checkboxWidth;
      return isNumber(width) ? width + 'px' : width;
    });

    function renderCheckbox(option: Record<PropertyKey, any>, index: number) {
      const checkboxProps = componentProps.value.checkboxProps;
      const value = getValue(option);

      return h(
        checkboxType.value,
        mergeProps(
          {
            ...option,
            key: getKey(value),
            ...(isFunction(checkboxProps) ? checkboxProps(option, index) : checkboxProps),
          },
          {
            style: {
              width: checkboxWidth.value,
              margin: 0,
            },
          },
        ),
        slots.checkbox ? () => slots.checkbox!({ option, index }) : undefined,
      );
    }

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => {
          const label = getLabelByValue(convertedOptions.value, val);
          return Array.isArray(label) ? label.join(', ') : (label as string);
        });
      }

      const checkboxGroupVnode = h(
        ElCheckboxGroup,
        mergeProps(checkboxGroupProps.value, {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '30px',
          },
        }),
        () => convertedOptions.value.map((item, index) => renderCheckbox(item, index)),
      );

      return componentProps.value.indeterminate
        ? h(
            Panel,
            {
              modelValue: checkboxGroupProps.value.modelValue,
              'onUpdate:modelValue': componentProps.value['onUpdate:modelValue'],
              options: convertedOptions.value,
              maxHeight: componentProps.value.maxHeight,
            },
            () => checkboxGroupVnode,
          )
        : checkboxGroupVnode;
    };
  },
  {
    name: 'CoFieldCheckboxGroup',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldCheckboxGroupSlots>,
  },
);
</script>
