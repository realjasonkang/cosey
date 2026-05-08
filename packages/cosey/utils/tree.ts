type MergeNode<INode, PidKey extends string, ChildrenKey extends string> = INode & {
  [k in PidKey]?: number;
} & {
  [k in ChildrenKey]?: MergeNode<INode, PidKey, ChildrenKey>[];
};

/**
 * 根据给定的键名，将数组转换为树形结构，并返回此树形对象和字典对象。
 * 此函数会改变原数组元素对象。
 */
export function arrayToTree<
  INode extends Record<any, any>,
  INodeList extends INode[],
  IdKey extends string,
  PidKey extends string,
  ChildrenKey extends string,
  MergedNode = MergeNode<INode, PidKey, ChildrenKey>,
>(array: INodeList, idKey: IdKey, pidKey: PidKey, childrenKey: ChildrenKey) {
  const mapItem: Record<number, MergedNode> = {};
  const nodes: MergedNode[] = [];

  array.forEach((node) => {
    mapItem[node[idKey]] = node;
  });

  array.forEach((node) => {
    if (node[pidKey]) {
      const parent = mapItem[node[pidKey]] as any;
      const children = (parent[childrenKey] ??= [] as MergedNode[]);
      children.push(node);
    } else {
      nodes.push(node);
    }
  });

  return [nodes, mapItem] as [MergedNode[], Record<number, MergedNode>];
}

/**
 * 遍历树，类似于数组的forEach操作。
 */
export function walkTree<INode extends Record<any, any>>(
  tree: INode[],
  childrenKey: string,
  callback: (node: INode) => void | boolean,
) {
  return tree.some((node) => {
    const result = callback(node);
    if (result === true) {
      return true;
    }
    const children = node[childrenKey];
    if (Array.isArray(children) && children.length) {
      const result = walkTree(children, childrenKey, callback);
      if (result === true) {
        return true;
      }
    }
  });
}

/**
 * 遍历树，类似于 walkTree，但会先回调节点，再遍历其子节点。
 */
export function walkTreeNode<INode extends Record<any, any>>(
  node: INode,
  childrenKey: string,
  callback: (node: INode) => void,
) {
  callback(node);
  const children = node[childrenKey];
  if (Array.isArray(children) && children.length) {
    children.forEach((node) => {
      walkTreeNode(node, childrenKey, callback);
    });
  }
}

/**
 * 遍历祖先节点，会从传递的节点开始
 */
export function walkAncestor<INode extends Record<any, any>>(
  node: INode | null | undefined,
  parentKey: string,
  callback: (node: INode) => void,
) {
  if (node) {
    callback(node);
    walkAncestor(node[parentKey], parentKey, callback);
  }
}

interface MapTreeOptions {
  childrenKey?: string;
  newChildrenKey?: string;
  parent?: Record<PropertyKey, any>;
}

/**
 * 类似于数组的 map 操作，会返回一颗新的树；
 * callback 的返回值会作为树的节点。
 */
export function mapTree<
  MappedNode extends Record<PropertyKey, any>,
  INode extends Record<PropertyKey, any>,
>(
  tree: INode[],
  callback: (node: INode, index: number, parent?: Record<PropertyKey, any>) => MappedNode,
  options: MapTreeOptions = {},
) {
  const { childrenKey = 'children', newChildrenKey = childrenKey, parent } = options;
  return tree.map((node, i) => {
    const rNode = callback(node, i, parent);

    const children = node[childrenKey];
    if (children && children.length) {
      (rNode as any)[newChildrenKey] = mapTree(children, callback, {
        childrenKey,
        newChildrenKey,
        parent: rNode,
      });
    }
    return rNode;
  });
}

export type ExtraTreeNode<
  Extra extends Record<PropertyKey, any> = any,
  INode extends Record<PropertyKey, any> = any,
> = {
  data: INode;
  leafCount: number;
  level: number;
  reverseLevel: number;
  parent?: ExtraTreeNode<Extra, INode>;
  children?: ExtraTreeNode<Extra, INode>[];
  tableNext?: ExtraTreeNode<Extra, INode>;
  prevSibling?: ExtraTreeNode<Extra, INode>;
  nextSibling?: ExtraTreeNode<Extra, INode>;
  firstChild?: ExtraTreeNode<Extra, INode>;
  lastChild?: ExtraTreeNode<Extra, INode>;
} & Extra;

/**
 * 类似于数组的 map 操作，会返回一颗新的树；
 * 会将 callback 返回值存放在树节点的 data 属性，此节点还包含额外的属性。
 */
export function mapTreeExtra<
  Extra extends Record<PropertyKey, any>,
  MappedNode extends Record<PropertyKey, any>,
  INode extends Record<PropertyKey, any>,
>(
  tree: INode[],
  callback: (node: INode, index: number, parent?: Record<PropertyKey, any>) => MappedNode,
  options?: {
    childrenKey?: string;
    mergeLast?: boolean;
    customNode?: (node: ExtraTreeNode<Extra, MappedNode>) => Extra;
    parent?: ExtraTreeNode<Extra, MappedNode>;
  },
  _internalLevel = 1,
) {
  const { mergeLast, customNode, childrenKey = 'children', parent } = options || {};

  let prevNode: ExtraTreeNode<Extra, MappedNode>;
  return tree.map((node, index) => {
    const mappedNode = callback(node, index, parent);
    let rNode = {
      data: mappedNode,
      parent,
      leafCount: 1,
      prevSibling: prevNode,
      level: _internalLevel,
      reverseLevel: 1,
    } as ExtraTreeNode<Extra, MappedNode>;

    if (customNode) {
      rNode = customNode(rNode) as ExtraTreeNode<Extra, MappedNode>;
    }

    const children = node[childrenKey];
    if (children && children.length) {
      const mappedChildren = mapTreeExtra(
        children,
        callback,
        {
          ...options,
          parent: rNode,
        },
        _internalLevel + 1,
      ) as ExtraTreeNode<Extra, MappedNode>[];
      rNode.children = mappedChildren;
      rNode.leafCount = mappedChildren.reduce(
        (count: number, rNode: ExtraTreeNode<Extra, MappedNode>) => count + rNode.leafCount,
        0,
      );
      rNode.firstChild = mappedChildren[0];
      rNode.lastChild = mappedChildren[mappedChildren.length - 1];
      rNode.reverseLevel = Math.max(...mappedChildren.map((item) => item.reverseLevel)) + 1;
    } else {
      if (mergeLast && prevNode?.reverseLevel === 1) {
        rNode.leafCount = 0;
      }
    }

    if (prevNode) {
      prevNode.nextSibling = rNode;
    }
    prevNode = rNode;
    return rNode;
  });
}

/**
 * 查找表格遍历中的下一个兄弟节点。
 * 当开启 mergeLast 时，最后一级连续叶子节点会被合并到同一个单元格中，
 * 因此这里要跳过这些已经被合并展示的叶子节点，但仍需保留后续的分支节点。
 */
function getNextSibling<
  Extra extends Record<PropertyKey, any> = any,
  INode extends Record<PropertyKey, any> = any,
>(node?: ExtraTreeNode<Extra, INode>, mergeLast?: boolean) {
  if (node) {
    let nextSibling = node.nextSibling;

    // 跳过已经和前一个叶子节点合并进同一单元格的连续叶子节点。
    while (
      mergeLast &&
      nextSibling &&
      nextSibling.reverseLevel === 1 &&
      nextSibling.prevSibling?.reverseLevel === 1
    ) {
      nextSibling = nextSibling.nextSibling;
    }

    if (nextSibling) {
      return nextSibling;
    } else {
      // 当前层已经没有可继续遍历的兄弟节点时，回到父级继续向后查找。
      return getNextSibling(node.parent, mergeLast);
    }
  }
}

/**
 * 将 ExtraTreeNode<any>[] 转换为二维数组，以便使用表格进行展示。
 */
export function extraTreeToTable<
  Extra extends Record<PropertyKey, any> = any,
  INode extends Record<PropertyKey, any> = any,
>(tree: ExtraTreeNode<Extra, INode>[], mergeLast?: boolean) {
  const map: ExtraTreeNode<Extra, INode>[][] = [];
  let row: ExtraTreeNode<Extra, INode>[] = [];
  let current: ExtraTreeNode<Extra, INode> | undefined = tree[0];

  if (current) {
    map.push(row);
  }

  while (current) {
    row.push(current);

    if (current.firstChild) {
      current = current.firstChild;
    } else {
      current = getNextSibling(current, mergeLast);
      if (current) {
        row = [];
        map.push(row);
      }
    }
  }

  return map;
}
