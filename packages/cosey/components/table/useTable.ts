import { computed, MaybeRef, mergeProps, unref } from 'vue';
import { type TableExpose, type TableProps, tableExposeKeys } from './table.api';
import { createMergedExpose } from '../../utils';

export type UseTableProps = TableProps & { [prop: PropertyKey]: any };

export function useTable(props: MaybeRef<UseTableProps>): [UseTableProps, TableExpose] {
  let tableRef: TableExpose;

  const getExpose = (expose: TableExpose) => {
    tableRef = expose;
  };

  const mergedProps = computed(() => {
    return mergeProps(
      {
        getExpose,
      },
      unref(props),
    );
  });

  const expose = createMergedExpose<TableExpose>(tableExposeKeys, () => tableRef);

  return [mergedProps, expose] as [UseTableProps, TableExpose];
}
