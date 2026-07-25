import { ref, useTemplateRef, watch, reactive, defineComponent, computed } from 'vue';
import { ElButton, ElInput, ElSpace } from 'element-plus';
import { useEditor } from 'slate-vue3';
import katex from 'katex';
import Button from '../button';
import { Panel } from '../../panel';
import { FormDialog } from '../../form-dialog';
import { Form } from '../../form';
import Row from '../../row';
import Col from '../../col';
import Icon from '../../icon';
import { formulas } from '../plugins/formula';
import { getPointingOptions, isPointingAt } from '../utils';
import { type FormulaElement } from '../types';

export default defineComponent({
  name: 'CoEditorFormatFormula',
  setup() {
    const editor = useEditor();

    const isActive = computed(() => isPointingAt(editor, 'formula'));

    const visible = ref(false);

    const formModel = reactive({
      formula: '',
    });

    const onSubmit = () => {
      if (formModel.formula) {
        editor.insertFormula(formModel.formula);
      }
    };

    const onClick = () => {
      if (!editor.selection) return;

      const nodes = editor.nodes<FormulaElement>(getPointingOptions(editor, 'formula'));
      const { done, value } = nodes.next();

      if (done) {
        formModel.formula = '';
      } else {
        const [node] = value;
        formModel.formula = node.formula;
      }

      visible.value = true;
    };

    const previewEl = useTemplateRef<HTMLElement>('preview');

    watch([previewEl, () => formModel.formula], ([el, formula]) => {
      if (el) {
        katex.render(formula, el, {
          throwOnError: false,
          errorColor: '#f00',
          output: 'mathml',
        });
      }
    });

    return () => {
      return (
        <>
          <Button active={isActive.value} onClick={onClick}>
            <Icon name="co:function-math" />
          </Button>

          <FormDialog v-model={visible.value} title="LaTeX 公式" width="760px">
            <Row gutter={8} style="row-gap: 8px">
              <Col sm={8}>
                <Panel header="数学公式" maxHeight="300px">
                  <ElSpace fill>
                    {formulas.map((item) => (
                      <ElButton
                        key={item.formula}
                        onClick={() => (formModel.formula = item.formula)}
                      >
                        {item.name}
                      </ElButton>
                    ))}
                  </ElSpace>
                </Panel>
              </Col>
              <Col sm={16}>
                <ElSpace fill style="display: flex">
                  <Panel header="编辑公式">
                    <Form model={formModel} submit={onSubmit}>
                      <ElInput
                        v-model={formModel.formula}
                        type="textarea"
                        placeholder="请输入公式"
                        resize="none"
                        rows={6}
                      />
                    </Form>
                  </Panel>
                  <Panel header="预览">
                    <div ref="preview" style="height: 80px"></div>
                  </Panel>
                </ElSpace>
              </Col>
            </Row>
          </FormDialog>
        </>
      );
    };
  },
});
