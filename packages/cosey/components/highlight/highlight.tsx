import { computed, defineComponent, ref, onMounted } from 'vue';
import { ElScrollbar } from 'element-plus';
import { highlightCode, highlightProps, highlightSlots } from './highlight.api';
import { onHighlighterReady } from '../../utils/shiki';
import { useColorScheme } from '../../hooks';
import Copy from '../copy/copy';
import { createBem } from '../../utils';

export default defineComponent({
  name: 'CoHighlight',
  props: highlightProps,
  slots: highlightSlots,
  setup(props) {
    const bem = createBem('highlight');
    const { appliedColorScheme } = useColorScheme();
    const ready = ref(false);
    onMounted(() => onHighlighterReady(() => (ready.value = true)));

    const highlightedHtml = computed(() => {
      void ready.value;
      void appliedColorScheme.value; // re-evaluate on shiki ready or theme toggle
      return highlightCode(props.code || '', props.lang);
    });

    return () => {
      return (
        <div class={bem.b()}>
          <ElScrollbar class={bem.e('scroll')} maxHeight={props.maxHeight}>
            <div innerHTML={highlightedHtml.value}></div>
          </ElScrollbar>
          <div class={bem.e('copy')}>
            <Copy text={props.code} />
          </div>
        </div>
      );
    };
  },
});
