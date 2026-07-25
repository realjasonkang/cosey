<script lang="ts">
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldNumberRangeProps, type FieldNumberRangeSlots } from './number-range.api';
import { addNullablePlaceholder } from '../../../../utils';
import { InputNumberRange } from '../../../input-number-range';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldNumberRangeProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue?.join(' - '));
      }

      return h(
        InputNumberRange,
        mergeProps(
          {
            startPlaceholder: t('co.common.pleaseInput'),
            endPlaceholder: t('co.common.pleaseInput'),
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldNumberRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldNumberRangeSlots>,
  },
);
</script>
