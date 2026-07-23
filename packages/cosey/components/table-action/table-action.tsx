import { defaultTableActionProps, tableActionProps } from './table-action.api';
import Item from './item';

import { useConfig } from '../config-provider';
import { computed, defineComponent, toValue } from 'vue';
import { TableActionItemProps } from './item.api';
import { isObject, createBem } from '../../utils';
import { ElDivider } from 'element-plus';
import { defaults } from 'lodash-es';

export default defineComponent({
  name: 'CoTableAction',
  props: tableActionProps,
  setup(props) {
    const dyadicActions = computed(() => {
      const actions = props.actions.filter(Boolean);
      return (Array.isArray(actions[0]) ? actions : [actions]) as TableActionItemProps[][];
    });

    const bem = createBem('table-action');

    const tableActionConfig = useConfig()?.tableAction;

    const mergeProps = computed(() => {
      return defaults({}, props, toValue(tableActionConfig), defaultTableActionProps);
    });

    return () => {
      return (
        <div class={bem.b()}>
          {dyadicActions.value.map((actions, rowIndex) => {
            return (
              <div
                key={rowIndex}
                class={[bem.e('row'), bem.is('divider', mergeProps.value.divider)]}
              >
                {actions
                  .filter(
                    (item) => isObject(item) && (item.hidden ? false : (item.visible ?? true)),
                  )
                  .map((action, actionIndex, arr) => {
                    return (
                      <>
                        <Item key={actionIndex} props={action} />
                        {mergeProps.value.divider && actionIndex !== arr.length - 1 && (
                          <ElDivider direction="vertical" />
                        )}
                      </>
                    );
                  })}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
