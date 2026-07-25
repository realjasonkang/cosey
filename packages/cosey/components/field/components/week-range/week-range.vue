<script lang="ts">
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldWeekRangeProps, type FieldWeekRangeSlots } from './week-range.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';
import { WeekRangePicker } from '../../../week-range-picker';

export default defineComponent(
  (props: FieldWeekRangeProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(t('co.form.weekOfYear'))).join(' - '),
        );
      }

      return h(
        WeekRangePicker,
        mergeProps(
          {
            startPlaceholder: t('co.common.pleaseSelect'),
            endPlaceholder: t('co.common.pleaseSelect'),
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldWeekRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldWeekRangeSlots>,
  },
);
</script>
