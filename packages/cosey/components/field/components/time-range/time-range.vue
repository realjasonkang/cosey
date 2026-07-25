<script lang="ts">
import { ElTimePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldTimeRangeProps, type FieldTimeRangeSlots } from './time-range.api';
import dayjs from 'dayjs';
import { addNullablePlaceholder, TIME_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldTimeRangeProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(TIME_FORMAT)).join(' - '),
        );
      }

      return h(
        ElTimePicker,
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
          {
            isRange: true,
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldTimeRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTimeRangeSlots>,
  },
);
</script>
