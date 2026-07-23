import { computed, defineComponent, ref, watch } from 'vue';
import { SvgIcon } from '../svg-icon';
import { IconifyIcon } from '../iconify-icon';
import { FontIcon } from '../font-icon';
import { iconProps } from './icon.api';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoIcon',
  props: iconProps,
  setup(props, { slots }) {
    const bem = createBem('icon');

    const prefix = ref();
    const name = ref('');

    watch(
      () => props.name,
      () => {
        if (props.name) {
          const result = /^(?:([^:]+):)?([^:]+)$/.exec(props.name);
          if (result) {
            prefix.value = result[1];
            name.value = result[2];
          }
        }
      },
      {
        immediate: true,
      },
    );

    const styles = computed(() => {
      const size = Number.isNaN(Number(props.size)) ? props.size : props.size + 'px';
      return {
        fontSize: size,
      };
    });

    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    const sizeClass = computed(() => {
      return sizes.includes(props.size as any) ? bem.m(props.size) : '';
    });

    const mergedProps = computed(() => {
      return {
        name: name.value,
        class: [bem.b(), sizeClass.value],
        style: styles.value,
      } as any;
    });

    function getDefualtSlot() {
      if (slots.default) {
        return <span {...mergedProps.value}>{slots.default()}</span>;
      }
      if (prefix.value) {
        if (prefix.value === 'svg') {
          return <SvgIcon {...mergedProps.value} />;
        }
        return <IconifyIcon {...mergedProps.value} prefix={prefix.value} />;
      } else {
        return <FontIcon {...mergedProps.value} />;
      }
    }

    return () => {
      return <span class={bem.bem('icon-wrapper')}>{getDefualtSlot()}</span>;
    };
  },
});
