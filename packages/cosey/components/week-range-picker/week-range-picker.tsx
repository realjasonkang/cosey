import {
  type WeekRangePickerExpose,
  weekRangePickerProps,
  weekRangePickerSlots,
  weekRangePickerEmits,
} from './week-range-picker.api';
import { defineComponent } from 'vue';
import { CommonPicker, UPDATE_MODEL_EVENT } from 'element-plus';
import PanelWeekRange from './panel-week-range';
import { createBem } from '../../utils';
import { ref } from 'vue';

export default defineComponent({
  name: 'CoWeekRangePicker',
  props: weekRangePickerProps,
  slots: weekRangePickerSlots,
  emits: weekRangePickerEmits,
  setup(props, { slots, emit, expose }) {
    const bem = createBem('week-range-picker');

    const commonPicker = ref<InstanceType<typeof CommonPicker>>();
    const refProps: WeekRangePickerExpose = {
      focus: () => {
        commonPicker.value?.focus();
      },
      blur: () => {
        commonPicker.value?.blur();
      },
      handleOpen: () => {
        commonPicker.value?.handleOpen();
      },
      handleClose: () => {
        commonPicker.value?.handleClose();
      },
    };

    expose(refProps);

    const onModelValueUpdated = (val: Date[] | null) => {
      emit(UPDATE_MODEL_EVENT, val);
    };

    return () => {
      return (
        <CommonPicker
          {...(props as any)}
          ref={commonPicker}
          type="weekrange"
          editable={false}
          class={bem.b()}
          onUpdate:modelValue={onModelValueUpdated}
        >
          {{
            default: (scopedProps: any) => {
              if (!scopedProps.visible && !scopedProps.actualVisible) return null;
              return <PanelWeekRange {...scopedProps} />;
            },
            'range-separator': slots['range-separator'],
          }}
        </CommonPicker>
      );
    };
  },
});
