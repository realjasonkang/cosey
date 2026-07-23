import { defineComponent, nextTick, ref, shallowReactive, useTemplateRef } from 'vue';
import { tableColumnEditorEmits, tableColumnEditorProps } from './table-column-editor.api';
import List from './list.vue';

import { createBem, mapTree, walkTree } from '../../../utils';
import { useTreeCheck } from '../../../hooks';
import { type TableColumnProps } from '../table-column/table-column.api';
import { ElButton, ElCheckbox, ElPopover, ElScrollbar } from 'element-plus';
import { useLocale } from '../../../hooks';

export default defineComponent({
  name: 'CoTableColumnEditor',
  props: tableColumnEditorProps,
  emits: tableColumnEditorEmits,
  setup(props, { emit, slots }) {
    const bem = createBem('table-column-editor');

    const { t } = useLocale();

    const wrapperRef = useTemplateRef<HTMLElement>('wrapper');

    const visible = ref(false);

    const maxHeight = ref('');

    // check

    const {
      tree,
      checkAllValue,
      checkAllIndeterminate,
      onCheckAllChange,
      initialize,
      setCheckedByNode,
    } = useTreeCheck<TableColumnProps>({
      childrenKey: 'columns',
      initialChecked: true,
    });

    const setUncheckedIfHiden = () => {
      walkTree(tree.value, 'children', (node) => {
        const hidden = !!node.data.hidden;
        if (hidden) {
          setCheckedByNode(node, false);
        }
      });
    };

    const onBeforeEnter = () => {
      initialize(
        mapTree(
          props.modelValue,
          (node) => {
            return shallowReactive({ ...node });
          },
          {
            childrenKey: 'columns',
          },
        ),
      );

      setUncheckedIfHiden();

      nextTick(() => {
        const el = wrapperRef.value;
        if (el) {
          const top = el.getBoundingClientRect().top;
          maxHeight.value = `calc(100vh - ${top}px - 68px - 10px)`;
        }
      });
    };

    // action
    const getUpdatedColumns = () => {
      return mapTree(
        tree.value,
        (node) => {
          return {
            ...node.data,
            hidden: node.checkedStatus === 'unchecked',
          };
        },
        {
          childrenKey: 'children',
          newChildrenKey: 'columns',
        },
      );
    };

    const confirm = () => {
      emit('update:modelValue', getUpdatedColumns());
      visible.value = false;
    };

    const cancel = () => {
      visible.value = false;
    };

    const reset = () => {
      emit('reset');
      visible.value = false;
    };

    return () => {
      return (
        <ElPopover
          {...props}
          v-model:visible={visible.value}
          virtual-triggering
          placement="bottom"
          width={240}
          trigger="click"
          popperStyle="--el-popover-padding: 0; --el-checkbox-height: auto"
          onBefore-enter={onBeforeEnter}
          v-slots={{
            default: () => (
              <div ref="wrapper" class={bem.b()}>
                <div class={bem.e('header')}>
                  <ElCheckbox
                    modelValue={checkAllValue.value}
                    indeterminate={checkAllIndeterminate.value}
                    onChange={onCheckAllChange}
                  >
                    {t('co.common.checkAll')}
                  </ElCheckbox>
                </div>
                <ElScrollbar maxHeight={maxHeight.value}>
                  <div class={bem.e('body')}>
                    <List nodeList={tree.value} />
                  </div>
                </ElScrollbar>
                <div class={bem.e('footer')}>
                  <ElButton size="small" link onClick={reset}>
                    {t('co.table.restoreDefault')}
                  </ElButton>
                  <div style="margin-inline-start: auto">
                    <ElButton size="small" link onClick={cancel}>
                      {t('co.common.cancel')}
                    </ElButton>
                    <ElButton size="small" link type="primary" onClick={confirm}>
                      {t('co.common.confirm')}
                    </ElButton>
                  </div>
                </div>
              </div>
            ),
            reference: () => slots.default?.({}),
          }}
        />
      );
    };
  },
});
