import { defineComponent } from 'vue';
import { ElButton, ElDivider, useLocale } from 'element-plus';
import { useEditor, useElement } from 'slate-vue3';
import { DOMEditor } from 'slate-vue3/dom';
import { createBem } from '../../../utils';
import Icon from '../../icon/icon';
import WidgetPopover from './widget-popover';

export default defineComponent({
  name: 'CoEditorContentLink',
  props: {
    url: {
      type: String,
    },
    target: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const { t } = useLocale();
    const bem = createBem('editor-content-link');

    const editor = useEditor();

    const element = useElement();

    const onOpenLink = () => {
      window.open(props.url, '_blank');
    };

    const onRemoveLink = () => {
      editor.unwrapLink(DOMEditor.findPath(editor, element.value));
    };

    return () => {
      return (
        <WidgetPopover
          v-slots={{
            reference: () => (
              <a href={props.url} target={props.target}>
                {slots.default?.()}
              </a>
            ),
            default: () => (
              <div class={bem.b()}>
                <ElButton type="primary" link onClick={onOpenLink}>
                  <Icon name="co:launch" class={bem.e('icon')} />
                  {t('co.editor.openLink')}
                </ElButton>
                <ElDivider direction="vertical" />
                <ElButton type="primary" link onClick={onRemoveLink}>
                  <Icon name="co:unlink" class={bem.e('icon')} />
                  {t('co.editor.removeLink')}
                </ElButton>
              </div>
            ),
          }}
        />
      );
    };
  },
});
