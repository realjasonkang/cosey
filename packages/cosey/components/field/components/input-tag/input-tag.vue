<script lang="ts">
import { ElInputTag } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldInputTagProps, type FieldInputTagSlots } from './input-tag.api';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldInputTagProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => val.join(', '));
      }

      return h(
        ElInputTag,
        {
          placeholder: t('co.common.pleaseInput'),
          clearable: true,
          ...props.componentProps,
        },
        slots,
      );
    };
  },
  {
    name: 'CoFieldInputTag',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldInputTagSlots>,
  },
);
</script>
