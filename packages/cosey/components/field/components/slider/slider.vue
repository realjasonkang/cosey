<script lang="ts">
import { ElSlider } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldSliderProps, type FieldSliderSlots } from './slider.api';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldSliderProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(ElSlider, props.componentProps, slots);
    };
  },
  {
    name: 'CoFieldSlider',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSliderSlots>,
  },
);
</script>
