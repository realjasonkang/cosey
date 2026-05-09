import type { ExtractPropTypes, PropType, SlotsType, VNodeChild } from 'vue';
import { ExtraTreeNode, isBoolean, isObject } from '../../utils';

type INode = Record<PropertyKey, any>;

export const horizontalTreeProps = {
  data: {
    type: Array as PropType<INode[]>,
  },
  props: {
    type: Object as PropType<{
      children?: string;
      label?: string;
      disabled?: string | ((data: INode[], node: INode) => string);
      class?: string | ((data: INode[], node: INode) => string);
    }>,
  },
  nodeKey: {
    type: String,
  },
  nodeWidth: {
    type: String,
    default: '120px',
  },
  mergeLast: {
    type: Boolean,
    default: true,
  },
  showCheckbox: {
    type: Boolean,
  },
  checkStrictly: {
    type: Boolean,
  },
  renderNode: {
    type: Function as PropType<
      (node: ExtraTreeNode<any>, defaultRender: () => VNodeChild) => VNodeChild
    >,
  },
  renderContent: {
    type: Function as PropType<
      (node: ExtraTreeNode<any>, defaultRender: () => VNodeChild) => VNodeChild
    >,
  },
};

export type HorizontalTreeProps = ExtractPropTypes<typeof horizontalTreeProps>;

export interface HorizontalTreeSlots {
  default: {};
}

export const horizontalTreeSlots = Object as SlotsType<HorizontalTreeSlots>;

export const horizontalTreeEmits = {
  'check-change': (node: ExtraTreeNode<any>, checked: boolean) =>
    isObject(node) && isBoolean(checked),
};

export type HorizontalTreeEmits = typeof horizontalTreeEmits;

export interface HorizontalTreeExpose {
  getCheckedNodes: () => INode[];
  setCheckedNodes: (nodes: INode[]) => void;
  getCheckedKeys: () => (string | number)[];
  setCheckedKeys: (keys: (string | number)[]) => void;
  setLeafOnlyCheckedKeys: (keys: (string | number)[]) => void;
  setChecked: (key: string | number, checked: boolean) => void;
  getHalfCheckedNodes: () => INode[];
  getHalfCheckedKeys: () => (string | number)[];
  getNode: (key: string | number) => INode | undefined;
}
