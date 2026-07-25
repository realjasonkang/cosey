<script lang="ts">
import { ElInput } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldInputProps, type FieldInputSlots } from './input.api';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldInputProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElInput,
        mergeProps(
          {
            placeholder: t('co.common.pleaseInput'),
            clearable: true,
            style: {
              display: 'flex',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldInput',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldInputSlots>,
  },
);
</script>
