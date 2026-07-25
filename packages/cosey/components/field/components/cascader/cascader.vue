<script lang="ts">
import { ElCascader } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldCascaderProps, type FieldCascaderSlots } from './cascader.api';
import { getTreeLabelByValue, addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldCascaderProps, { slots }) => {
    const { t } = useLocale();

    const componentProps = computed(() => {
      return props.componentProps ?? {};
    });

    const mergedOptionProps = computed(() => {
      return Object.assign(
        {
          label: 'label',
          value: 'value',
          children: 'children',
        },
        componentProps.value.props,
      );
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) =>
          getTreeLabelByValue(
            componentProps.value.options ?? [],
            val,
            mergedOptionProps.value,
          ).join(' / '),
        );
      }

      return h(
        ElCascader,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          componentProps.value,
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldCascader',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldCascaderSlots>,
  },
);
</script>
