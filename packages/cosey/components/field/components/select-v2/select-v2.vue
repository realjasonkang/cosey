<script lang="ts">
import { ElSelectV2 } from 'element-plus';
import { computed, defineComponent, h, mergeProps, unref, type SlotsType } from 'vue';
import {
  fieldSelectOmitKeys,
  flatGroup,
  type FieldSelectV2Props,
  type FieldSelectV2Slots,
} from './select-v2.api';
import { addNullablePlaceholder, getLabelByValue } from '../../../../utils';
import { useLocale, useProps } from '../../../../hooks';
import { omit } from 'lodash-es';

export default defineComponent(
  (props: FieldSelectV2Props, { slots }) => {
    const { t } = useLocale();

    const componentProps = computed(() => props.componentProps || {});

    const omittedProps = computed(() => omit(componentProps.value, fieldSelectOmitKeys));

    const { getOptions, aliasProps } = useProps(componentProps);

    const optionProps = computed(
      () => componentProps.value.optionProps || ((option: any) => option),
    );

    function convertRecur(options: Record<string, any>[]): Record<string, any>[] {
      return options.map((option, index) => {
        if (aliasProps.value.options in option) {
          return {
            ...optionProps.value(option, index),
            [aliasProps.value.options]: convertRecur(getOptions(option)),
          };
        }
        return optionProps.value(option, index);
      });
    }

    const convertedOptions = computed(() => {
      return convertRecur(unref(componentProps.value.options) ?? []);
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => {
          const label = getLabelByValue(
            flatGroup(componentProps.value.options || [], componentProps.value.props?.options),
            val,
          );
          return Array.isArray(label) ? label.join(', ') : (label as string);
        });
      }

      return h(
        ElSelectV2,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
            style: {
              verticalAlign: 'top',
            },
          },
          omittedProps.value,
          {
            options: convertedOptions.value,
          },
        ) as any,
        slots,
      );
    };
  },
  {
    name: 'CoFieldSelectV2',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSelectV2Slots>,
  },
);
</script>
