import {
  type HorizontalTreeExpose,
  horizontalTreeProps,
  horizontalTreeSlots,
  horizontalTreeEmits,
} from './horizontal-tree.api';
import useStyle, { HorizontalTreeNodeWidthVar } from './horizontal-tree.style';
import { useComponentConfig } from '../config-provider';
import { ExtraTreeNode, extraTreeToTable, isString, mapTree, walkTree } from '../../utils';
import { computed, defineComponent, watch } from 'vue';
import { type CheckableNode, useTreeCheck } from '../../hooks';
import { useLocale } from '../../hooks';
import { ElCheckbox } from 'element-plus';

export default defineComponent({
  name: 'CoHorizontalTree',
  props: horizontalTreeProps,
  slots: horizontalTreeSlots,
  emits: horizontalTreeEmits,
  setup(props, { emit, expose }) {
    const { prefixCls } = useComponentConfig('horizontal-tree', props);

    const { hashId } = useStyle(prefixCls);

    const { t } = useLocale();

    const propNames = computed(() => {
      return Object.assign(
        {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
          class: 'class',
        },
        props.props,
      );
    });

    const {
      rootNode,
      tree: checkableTree,
      checkAllValue,
      checkAllIndeterminate,
      onCheckAllChange,
      initialize,
      setCheckedByNode,
    } = useTreeCheck({
      mergeLast: props.mergeLast,
      childrenKey: propNames.value.children,
      checkStrictly: props.checkStrictly,
    });

    const tree = computed(() => {
      return mapTree(props.data || [], (node) => node);
    });

    watch(
      tree,
      () => {
        initialize(tree.value);
      },
      {
        immediate: true,
      },
    );

    const tableTree = computed(() => {
      return extraTreeToTable(checkableTree.value, props.mergeLast);
    });

    const maxLevel = computed(() =>
      Math.max(...tableTree.value.map(([item]) => item.reverseLevel)),
    );

    const getDisabled = (node: Record<PropertyKey, any>) => {
      return isString(propNames.value.disabled)
        ? node[propNames.value.disabled]
        : node[(propNames.value.disabled as (...args: any[]) => any)(props.data, node)];
    };

    const getNodeClass = (node: Record<PropertyKey, any>) => {
      return isString(propNames.value.class)
        ? node[propNames.value.class]
        : node[(propNames.value.class as (...args: any[]) => any)(props.data, node)];
    };

    const onCheckChange = (node: CheckableNode, checked: boolean) => {
      setCheckedByNode(node, checked);
      emit('check-change', node.data, checked);
    };

    // expose

    const getCheckedNodes = () => {
      const nodes: Record<PropertyKey, any>[] = [];

      walkTree(checkableTree.value, 'children', (node) => {
        if (node.checkedStatus === 'checked') {
          nodes.push(node.data);
        }
      });

      return nodes;
    };

    const setCheckedKeys = (keys: (string | number)[]) => {
      const nodes: CheckableNode[] = [];

      walkTree(checkableTree.value, 'children', (node) => {
        const id = node.data[props.nodeKey!];
        if (keys.includes(id)) {
          nodes.push(node);
        }
      });

      setCheckedByNode(rootNode, false);

      nodes.forEach((node) => {
        setCheckedByNode(node, true);
      });
    };

    const setLeafOnlyCheckedKeys = (keys: (string | number)[]) => {
      const nodes: CheckableNode[] = [];

      walkTree(checkableTree.value, 'children', (node) => {
        const id = node.data[props.nodeKey!];
        if (keys.includes(id)) {
          nodes.push(node);
        }
      });

      setCheckedByNode(rootNode, false);

      nodes.forEach((node) => {
        if (node.reverseLevel === 1) {
          setCheckedByNode(node, true);
        }
      });
    };

    const getCheckedKeys = () => {
      const keys: (string | number)[] = [];

      walkTree(checkableTree.value, 'children', (node) => {
        if (node.checkedStatus === 'checked') {
          const key = node.data[props.nodeKey!];
          keys.push(key);
        }
      });

      return keys;
    };

    const setCheckedNodes = (nodes: Record<PropertyKey, any>[]) => {
      const keys = nodes.map((node) => node[props.nodeKey!]);
      setCheckedKeys(keys);
    };

    const setChecked = (key: string | number, checked: boolean) => {
      walkTree(checkableTree.value, 'children', (node) => {
        if (node.data[props.nodeKey!] === key) {
          setCheckedByNode(node, checked);
          return true;
        }
      });
    };

    const getHalfCheckedNodes = () => {
      const nodes: Record<PropertyKey, any>[] = [];

      walkTree(checkableTree.value, 'children', (node) => {
        if (node.checkedStatus === 'indeterminate') {
          nodes.push(node.data);
        }
      });

      return nodes;
    };

    const getHalfCheckedKeys = () => {
      const nodes = getHalfCheckedNodes();
      return nodes.map((node) => node[props.nodeKey!]);
    };

    const getNode = (key: string | number) => {
      let _node: Record<PropertyKey, any> | undefined;
      walkTree(checkableTree.value, 'children', (node) => {
        if (node.data[props.nodeKey!] === key) {
          _node = node.data;
          return true;
        }
      });
      return _node;
    };

    expose<HorizontalTreeExpose>({
      getCheckedNodes,
      setCheckedNodes,
      setCheckedKeys,
      setLeafOnlyCheckedKeys,
      getCheckedKeys,
      setChecked,
      getHalfCheckedNodes,
      getHalfCheckedKeys,
      getNode,
    });

    function renderNode(node: ExtraTreeNode<any>) {
      function renderContent() {
        return <span class={getNodeClass(node.data)}>{node.data[propNames.value.label]}</span>;
      }

      function renderMayCustomContent() {
        return props.renderContent ? props.renderContent(node, renderContent) : renderContent();
      }

      return (
        <div class={`${prefixCls.value}-node`}>
          {props.showCheckbox ? (
            <ElCheckbox
              disabled={getDisabled(node.data)}
              modelValue={node.checkedStatus === 'checked'}
              indeterminate={node.checkedStatus === 'indeterminate'}
              onChange={(value) => onCheckChange(node, !!value)}
            >
              {renderMayCustomContent()}
            </ElCheckbox>
          ) : (
            renderMayCustomContent()
          )}
        </div>
      );
    }

    function renderMayCustomNode(node: ExtraTreeNode<any>) {
      return props.renderNode ? props.renderNode(node, () => renderNode(node)) : renderNode(node);
    }

    function getMergedLeafNodes(node: ExtraTreeNode<any>) {
      const nodes: ExtraTreeNode<any>[] = [];
      let current: ExtraTreeNode<any> | undefined = node;

      while (current && current.reverseLevel === 1) {
        nodes.push(current);
        current = current.nextSibling;
      }

      return nodes;
    }

    return () => {
      return (
        <div
          class={[hashId.value, prefixCls.value]}
          style={{ [HorizontalTreeNodeWidthVar]: props.nodeWidth }}
        >
          {tableTree.value.length === 0 ? (
            <div class={`${prefixCls.value}-empty`}>{t('co.common.noData')}</div>
          ) : (
            <table>
              {props.showCheckbox && !props.checkStrictly && (
                <thead>
                  <tr>
                    <td colspan={maxLevel.value}>
                      <div class={`${prefixCls.value}-node`}>
                        <ElCheckbox
                          modelValue={checkAllValue.value}
                          indeterminate={checkAllIndeterminate.value}
                          onChange={onCheckAllChange}
                        >
                          {t('co.common.checkAll')}
                        </ElCheckbox>
                      </div>
                    </td>
                  </tr>
                </thead>
              )}
              <tbody>
                {tableTree.value.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((node, j) => {
                        return (
                          <td
                            key={j}
                            colspan={node.reverseLevel === 1 ? maxLevel.value - node.level + 1 : 1}
                            rowspan={node.leafCount}
                          >
                            {node.reverseLevel !== 1 || !props.mergeLast ? (
                              renderMayCustomNode(node)
                            ) : (
                              <div>{getMergedLeafNodes(node).map(renderMayCustomNode)}</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      );
    };
  },
});
