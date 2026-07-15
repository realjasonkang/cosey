import { defineComponent } from 'vue';
import { FontIconProps } from './font-icon.api';

export default defineComponent({
  name: 'CoFontIcon',
  props: FontIconProps,
  setup(props) {
    return () => {
      return <span class={props.name}></span>;
    };
  },
});
