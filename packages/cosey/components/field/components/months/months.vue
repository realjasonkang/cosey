<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldMonthsProps, type FieldMonthsSlots } from './months.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder, MONTH_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldMonthsProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(MONTH_FORMAT)).join(', '),
        );
      }

      return h(
        ElDatePicker,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
          {
            type: 'months',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldMonths',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMonthsSlots>,
  },
);
</script>
