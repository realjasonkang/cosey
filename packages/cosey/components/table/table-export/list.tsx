import { defineComponent, PropType } from 'vue';
import { type TableColumnProps } from '../table-column/table-column.api';
import Item from './item';
import { createBem } from '../../../utils';
import { type CheckableNode } from '../../../hooks';

export default defineComponent({
  props: {
    nodeList: {
      type: Array as PropType<CheckableNode<TableColumnProps>[]>,
      required: true,
    },
  },
  setup(props) {
    const bem = createBem('table-export');

    return () => {
      return (
        <div class={bem.e('list')}>
          {props.nodeList.map((node, i) => (
            <Item node={node} key={i} />
          ))}
        </div>
      );
    };
  },
});
