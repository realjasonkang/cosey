<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldMonthProps, type FieldMonthSlots } from './month.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder, MONTH_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldMonthProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(MONTH_FORMAT));
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
            type: 'month',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldMonth',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMonthSlots>,
  },
);
</script>
