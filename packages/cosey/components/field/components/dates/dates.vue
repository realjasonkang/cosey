<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldDatesProps, type FieldDatesSlots } from './dates.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder, DATE_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldDatesProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(DATE_FORMAT)).join(', '),
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
            type: 'dates',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldDates',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldDatesSlots>,
  },
);
</script>
