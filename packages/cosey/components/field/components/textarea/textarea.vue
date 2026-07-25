<script lang="ts">
import { ElInput } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldTextareaProps, type FieldTextareaSlots } from './textarea.api';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldTextareaProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElInput,
        {
          placeholder: t('co.common.pleaseInput'),
          clearable: true,
          ...props.componentProps,
          type: 'textarea',
        },
        slots,
      );
    };
  },
  {
    name: 'CoFieldTextarea',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTextareaSlots>,
  },
);
</script>
