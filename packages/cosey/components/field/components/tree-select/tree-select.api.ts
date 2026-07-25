import { type TreeInstance } from 'element-plus';
import { type FieldComponentCommonProps } from '../common';
import {
  FieldSelectProps,
  FieldSelectSlots,
  type FieldSelectEmits,
  type FieldSelectExpose,
} from '../select/select.api';
import { iconPropType } from 'element-plus/es/utils/index.mjs';
import { ExtractPropTypes, PropType } from 'vue';

export const elTreeProps = {
  data: {
    type: Array as PropType<Array<{ [key: string]: any }>>,
    default: () => [],
  },
  emptyText: {
    type: String,
  },
  renderAfterExpand: {
    type: Boolean,
    default: true,
  },
  nodeKey: String,
  checkStrictly: Boolean,
  defaultExpandAll: Boolean,
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  checkOnClickNode: Boolean,
  checkDescendants: {
    type: Boolean,
    default: false,
  },
  autoExpandParent: {
    type: Boolean,
    default: true,
  },
  defaultCheckedKeys: Array,
  defaultExpandedKeys: Array,
  currentNodeKey: [String, Number],
  renderContent: Function,
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  allowDrag: Function,
  allowDrop: Function,
  props: {
    type: Object,
    default: () => ({
      children: 'children',
      label: 'label',
      disabled: 'disabled',
    }),
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  highlightCurrent: Boolean,
  load: Function,
  filterNodeMethod: Function,
  accordion: Boolean,
  indent: {
    type: Number,
    default: 18,
  },
  icon: {
    type: iconPropType,
  },
};

export interface FieldTreeSelectProps extends FieldComponentCommonProps {
  componentProps?: FieldSelectProps['componentProps'] &
    Partial<ExtractPropTypes<typeof elTreeProps>> & {
      onNodeClick?: (...args: any[]) => void;
      onNodeContextmenu?: (...args: any[]) => void;
      onCheckChange?: (...args: any[]) => void;
      onCheck?: (...args: any[]) => void;
      onCurrentChange?: (...args: any[]) => void;
      onNodeExpand?: (...args: any[]) => void;
      onNodeCollapse?: (...args: any[]) => void;
      onNodeDragStart?: (...args: any[]) => void;
      onNodeDragEnter?: (...args: any[]) => void;
      onNodeDragLeave?: (...args: any[]) => void;
      onNodeDragOver?: (...args: any[]) => void;
      onNodeDragEnd?: (...args: any[]) => void;
      onNodeDrop?: (...args: any[]) => void;
      [key: PropertyKey]: any;
    };
  componentSlots?: Partial<FieldTreeSelectSlots>;
}

export type FieldTreeSelectSlots = FieldSelectSlots & {};

export type FieldTreeSelectEmits = FieldSelectEmits & {
  (e: 'node-click', ...args: any[]): void;
  (e: 'node-contextmenu', ...args: any[]): void;
  (e: 'check-change', ...args: any[]): void;
  (e: 'check', ...args: any[]): void;
  (e: 'current-change', ...args: any[]): void;
  (e: 'node-expand', ...args: any[]): void;
  (e: 'node-collapse', ...args: any[]): void;
  (e: 'node-drag-start', ...args: any[]): void;
  (e: 'node-drag-enter', ...args: any[]): void;
  (e: 'node-drag-leave', ...args: any[]): void;
  (e: 'node-drag-over', ...args: any[]): void;
  (e: 'node-drag-end', ...args: any[]): void;
  (e: 'node-drop', ...args: any[]): void;
};

export type FieldTreeSelectExpose = FieldSelectExpose & TreeInstance;
