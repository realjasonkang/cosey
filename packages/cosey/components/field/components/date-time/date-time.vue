<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldDateTimeProps, type FieldDateTimeSlots } from './date-time.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder, DATE_TIME_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldDateTimeProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(DATE_TIME_FORMAT));
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
            type: 'datetime',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldDateTime',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldDateTimeSlots>,
  },
);
</script>
