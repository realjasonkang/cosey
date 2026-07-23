import { defineComponent } from 'vue';
import { tableStatisticsProps } from './table-stats.api';
import { createBem } from '../../../utils';

export default defineComponent({
  name: 'CoTableStats',
  props: tableStatisticsProps,
  setup(props) {
    const bem = createBem('table-stats');

    return () => {
      return (
        <div class={bem.b()}>
          {props.columns.map((column) => {
            let value = props.data[column.prop];
            if (column.format) {
              value = column.format(value);
            }

            return (
              <div class={bem.e('column')}>
                <div class={bem.e('label')}>{column.label}</div>
                <div class={bem.e('colon')}>:</div>
                <div class={bem.e('value')}>{value}</div>
              </div>
            );
          })}
        </div>
      );
    };
  },
});
