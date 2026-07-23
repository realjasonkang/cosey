import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { useClipboard } from '@vueuse/core';
import { copyProps } from './copy.api';
import Icon from '../icon';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoCopy',
  props: copyProps,
  setup(props) {
    const bem = createBem('copy');

    const { copy, copied } = useClipboard();

    return () => {
      return (
        <ElButton
          link
          type={props.type}
          class={[bem.b(), bem.is('copied', copied.value)]}
          style={{ color: props.color }}
          onClick={() => copy(props.text || '')}
        >
          <Icon name={copied.value ? 'co:checkmark' : 'co:copy'} class={bem.e('icon')} />
        </ElButton>
      );
    };
  },
});
