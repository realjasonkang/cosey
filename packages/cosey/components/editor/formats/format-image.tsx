import { computed, defineComponent, reactive, ref } from 'vue';
import { ElButton } from 'element-plus';
import { useEditor } from 'slate-vue3';
import { Icon } from '../../icon';
import Button from '../button';
import { chooseFiles } from '../../../utils';
import { FormDialog } from '../../form-dialog';
import { Form, FormItem } from '../../form';
import { useLocale } from '../../../hooks';
import { type ImageElement } from '../types';
import { getPointingOptions, isPointingAt } from '../utils';

export default defineComponent({
  name: 'CoEditorFormatImage',
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const isActive = computed(() => isPointingAt(editor, 'image'));

    const onSelect = () => {
      visible.value = false;

      chooseFiles({
        accept: 'image/*',
        multiple: false,
      }).then((files) => {
        files.forEach((file) => {
          editor.insertImage('', file);
        });
      });
    };

    const onClick = () => {
      if (!editor.selection) return;

      const nodes = editor.nodes<ImageElement>(getPointingOptions(editor, 'image'));
      const { done, value } = nodes.next();

      if (done) {
        Object.assign(model, {
          url: '',
          width: '',
          height: '',
        });
        actionType.value = 'insert';
      } else {
        const [node] = value;
        Object.assign(model, {
          url: node.url,
          width: node.width,
          height: node.height,
        });
        actionType.value = 'update';
      }

      visible.value = true;
    };

    // form
    const visible = ref(false);

    const actionType = ref<'update' | 'insert'>('insert');

    const title = computed(
      () =>
        `${actionType.value === 'update' ? t('co.editor.edit') : t('co.editor.insert')}${t('co.editor.image')}`,
    );

    const model = reactive({
      url: '',
      width: '',
      height: '',
    });

    const onSubmit = () => {
      if (!editor.selection) return;

      if (!model.url.trim()) return;

      if (actionType.value === 'update') {
        editor.setNodes(
          {
            ...model,
          },
          getPointingOptions(editor, 'image'),
        );
      } else {
        editor.insertImage(model.url, undefined, model.width, model.height);
      }
    };

    return () => {
      return (
        <>
          <Button active={isActive.value} onClick={onClick}>
            <Icon name="co:image" />
          </Button>

          <FormDialog v-model={visible.value} title={title.value} width="sm">
            <Form model={model} labelWidth="auto" grid rowProps={{ gutter: 16 }} submit={onSubmit}>
              <FormItem
                v-model={model.url}
                prop="url"
                label="URL"
                field-type="input"
                colProps={{ span: 20 }}
              />
              <ElButton text onClick={onSelect}>
                <Icon name="co:upload" />
              </ElButton>
              <FormItem
                v-model={model.width}
                prop="width"
                label={t('co.editor.width')}
                field-type="input"
                colProps={{ span: 12 }}
              />
              <FormItem
                v-model={model.height}
                prop="height"
                label={t('co.editor.height')}
                field-type="input"
                colProps={{ span: 12 }}
              />
            </Form>
          </FormDialog>
        </>
      );
    };
  },
});
