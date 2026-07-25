<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldWeekProps, type FieldWeekSlots } from './week.api';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

dayjs.extend(weekOfYear);

export default defineComponent(
  (props: FieldWeekProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(t('co.form.weekOfYear')));
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
            type: 'week',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldWeek',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldWeekSlots>,
  },
);
</script>
