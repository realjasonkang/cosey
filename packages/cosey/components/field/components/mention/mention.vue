<script lang="ts">
import { ElMention } from 'element-plus';
import { defineComponent, h, type SlotsType, mergeProps } from 'vue';
import { type FieldMentionProps, type FieldMentionSlots } from './mention.api';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldMentionProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElMention,
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
    name: 'CoFieldMention',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMentionSlots>,
  },
);
</script>
