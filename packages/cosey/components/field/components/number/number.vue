<script lang="ts">
import { ElInputNumber } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldNumberProps, type FieldNumberSlots } from './number.api';
import { addNullablePlaceholder, isString } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldNumberProps, { slots }) => {
    const { t } = useLocale();

    const value = computed(() => {
      let value = props.componentProps?.modelValue;

      if (isString(value)) {
        if (value === '') {
          value = null;
        } else {
          value = +value;
          if (isNaN(value)) {
            value = null;
          }
        }
      }

      return value;
    });

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(value.value);
      }

      return h(
        ElInputNumber,
        mergeProps(
          {
            placeholder: t('co.common.pleaseInput'),
            style: {
              verticalAlign: 'top',
              width: '100%',
            },
          },
          {
            ...props.componentProps,
            modelValue: value.value,
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldNumber',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldNumberSlots>,
  },
);
</script>
