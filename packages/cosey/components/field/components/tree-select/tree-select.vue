<script lang="ts">
import { ElTreeSelect } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType, computed } from 'vue';
import { type FieldTreeSelectProps, type FieldTreeSelectSlots } from './tree-select.api';
import { getTreeLabelByValue, addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldTreeSelectProps, { slots }) => {
    const { t } = useLocale();

    const componentProps = computed(() => {
      return props.componentProps ?? {};
    });

    const mergedOptionProps = computed(() => {
      return Object.assign(
        {
          label: 'label',
          children: 'children',
        },
        componentProps.value.props,
        {
          value: componentProps.value.valueKey ?? 'value',
        },
      );
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          getTreeLabelByValue(componentProps.value.data ?? [], val, mergedOptionProps.value).pop(),
        );
      }

      return h(
        ElTreeSelect,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
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
    name: 'CoFieldTreeSelect',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTreeSelectSlots>,
  },
);
</script>
