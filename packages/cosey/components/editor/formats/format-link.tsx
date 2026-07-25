import { computed, defineComponent, reactive, ref } from 'vue';
import { useEditor } from 'slate-vue3';
import { Node } from 'slate-vue3/core';
import { Icon } from '../../icon';
import Button from '../button';
import { FormDialog } from '../../form-dialog';
import { Form, FormItem } from '../../form';
import { useLocale } from '../../../hooks';
import { getPointingOptions, isPointingAt } from '../utils';
import { type LinkElement } from '../types';

export default defineComponent({
  name: 'CoEditorFormatLink',
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const isActive = computed(() => isPointingAt(editor, 'link'));

    const onClick = () => {
      if (!editor.selection) return;

      const nodes = editor.nodes<LinkElement>(getPointingOptions(editor, 'link'));
      const { done, value } = nodes.next();

      if (done) {
        Object.assign(formModel, {
          url: '',
          target: '_blank',
          text: editor.string(editor.selection!),
        });
      } else {
        const [node, path] = value;
        const { url, target } = node;

        editor.select(path);

        Object.assign(formModel, {
          url,
          target,
          text: Node.string(node),
        });
      }

      visible.value = true;
    };

    // form
    const visible = ref(false);

    const formModel = reactive({
      url: '',
      text: '',
      target: '',
    });

    const targetOptions = [
      { label: t('co.editor.currentWindow'), value: '_self' },
      { label: t('co.editor.newWindow'), value: '_blank' },
    ];

    const onSubmit = () => {
      if (!formModel.url.trim() || !formModel.text.trim()) {
        return;
      }

      editor.formatLink(formModel.url, formModel.target, formModel.text);
    };

    return () => {
      return (
        <>
          <Button active={isActive.value} onClick={onClick}>
            <Icon name="co:link" />
          </Button>

          <FormDialog v-model={visible.value} title={t('co.editor.insertLink')} width="sm">
            <Form model={formModel} label-width="auto" submit={onSubmit}>
              <FormItem v-model={formModel.url} prop="url" label="URL" fieldType="input" />
              <FormItem
                v-model={formModel.text}
                prop="text"
                label={t('co.editor.displayedText')}
                fieldType="input"
              />
              <FormItem
                v-model={formModel.target}
                prop="target"
                label={t('co.editor.openLinkAt')}
                fieldType="select"
                fieldProps={{
                  options: targetOptions,
                }}
              />
            </Form>
          </FormDialog>
        </>
      );
    };
  },
});
