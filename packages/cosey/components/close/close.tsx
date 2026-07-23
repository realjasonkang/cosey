import { defineComponent } from 'vue';
import Icon from '../icon/icon';
import { closeEmits } from './close.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoClose',
  emits: closeEmits,
  setup(_props, { emit }) {
    const bem = createBem('close');

    return () => {
      return (
        <span class={bem.b()} onClick={(event) => emit('click', event)}>
          <Icon name="co:close-large" />
        </span>
      );
    };
  },
});
