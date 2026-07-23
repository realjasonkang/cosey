import { computed, defineComponent } from 'vue';
import { useEditor, useElement } from 'slate-vue3';
import { Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { createBem } from '../../../utils';
import { getSortedRange } from '../utils';
import Icon from '../../icon/icon';
import ButtonGroup from '../button-group';
import Button from '../button';
import WidgetPopover from './widget-popover';

export default defineComponent({
  name: 'CoEditorContentTable',
  inheritAttrs: false,
  setup(_props, { slots, attrs }) {
    const bem = createBem('editor-content-table');

    const editor = useEditor();

    const element = useElement();

    const isActive = computed(() => {
      return !!(
        editor.selection &&
        Range.surrounds(
          editor.range(DOMEditor.findPath(editor, element.value)),
          getSortedRange(editor.selection),
        )
      );
    });

    const popperVisible = computed(() => {
      if (!editor.selection || Range.isExpanded(editor.selection)) return false;

      const table = editor.above({
        at: editor.selection,
        match: editor.isTable,
        mode: 'lowest',
      });

      return table && table[0] === element.value;
    });

    const tablePath = computed(() => {
      return DOMEditor.findPath(editor, element.value);
    });

    const cellPath = computed(() => {
      if (!popperVisible.value) return null;

      const cell = editor.above({
        match: editor.isTableCell,
      });

      if (!cell) return null;
      return cell[1];
    });

    return () => {
      return (
        <WidgetPopover
          visible={popperVisible.value}
          v-slots={{
            reference: () => (
              <table {...attrs} class={[bem.b(), bem.is('active', isActive.value)]}>
                {slots.default?.()}
              </table>
            ),
            default: () => (
              <div class={bem.e('toolbar')}>
                <ButtonGroup>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.insertRowAbove(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-row-plus-before" class={bem.e('icon')} />
                  </Button>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.insertRowBelow(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-row-plus-after" class={bem.e('icon')} />
                  </Button>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.deleteRow(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-row-remove" class={bem.e('icon')} />
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.insertColumnLeft(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-column-plus-before" class={bem.e('icon')} />
                  </Button>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.insertColumnRight(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-column-plus-after" class={bem.e('icon')} />
                  </Button>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.deleteColumn(tablePath.value, cellPath.value)
                    }
                  >
                    <Icon name="co:table-column-remove" class={bem.e('icon')} />
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.moveToHead(tablePath.value, cellPath.value)
                    }
                  >
                    H
                  </Button>
                  <Button
                    onClick={() =>
                      cellPath.value && editor.moveToBody(tablePath.value, cellPath.value)
                    }
                  >
                    B
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button onClick={() => editor.deleteTable(tablePath.value)}>
                    <Icon name="co:table-remove" class={bem.e('icon')} />
                  </Button>
                </ButtonGroup>
              </div>
            ),
          }}
        />
      );
    };
  },
});
