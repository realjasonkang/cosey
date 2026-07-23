import { computed, defineComponent, h, watch } from 'vue';
import { Slate, Editable, RenderPlaceholderProps, useInheritRef } from 'slate-vue3';
import { createEditor } from 'slate-vue3/core';
import { withDOM } from 'slate-vue3/dom';
import { withHistory } from 'slate-vue3/history';

import Toolbar from './toolbar';
import ButtonGroup from './button-group';
import FormatMark from './formats/format-mark';
import FormatHeading from './formats/format-heading';
import FormatBlockQuote from './formats/format-block-quote';
import FormatTable from './formats/format-table';
import FormatFont from './formats/format-font';
import FormatSize from './formats/format-size';
import FormatColor from './formats/format-color';
import FormatBackground from './formats/format-background';
import FormatIndent from './formats/format-indent';
import FormatAlign from './formats/format-align';
import ListType from './formats/format-list';
import FormatClear from './formats/format-clear';
import FormatSource from './formats/format-source';
import FormatLink from './formats/format-link';
import FormatCodeBlock from './formats/format-code-block';
import FormatImage from './formats/format-image';
import FormatVideo from './formats/format-video';
import FormatFormula from './formats/format-formula';

import { editorProps, editorSlots, editorEmits } from './editor.api';
import { createBem, debugWarn } from '../../utils';
import { useFocus } from './hooks/useFocus';
import { withDefaultPlugins } from './plugins';
import contentPlaceholder from './contents/content-placeholder';
import { useLocale } from '../../hooks';
import { usePopoverContainer } from './usePopoverContainer';
import { CHANGE_EVENT, useFormDisabled, useFormItem } from 'element-plus';

export default defineComponent({
  name: 'CoEditor',
  props: editorProps,
  slots: editorSlots,
  emits: editorEmits,
  setup(props, { emit }) {
    const bem = createBem('editor');

    const { t } = useLocale();

    // editor
    const editor = withDefaultPlugins(withHistory(withDOM(createEditor())));

    editor.children = [{ type: 'paragraph', children: [{ text: '' }] }];

    const { isFocus, onFocus, onBlur } = useFocus();

    // popover container
    const { mountPoint } = usePopoverContainer();

    // placeholder
    const renderPlaceholder = ({ attributes }: RenderPlaceholderProps) => {
      return h(
        contentPlaceholder,
        {
          ...useInheritRef(attributes),
          style: {},
        },
        () => props.placeholder || t('co.common.pleaseInput'),
      );
    };

    // value
    const innerValue = computed(() => props.modelValue ?? '');

    let currentValue = '';

    const { formItem } = useFormItem();

    watch(
      innerValue,
      () => {
        if (innerValue.value !== currentValue) {
          currentValue = innerValue.value;
          editor.setContent(innerValue.value);
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItem?.validate?.(CHANGE_EVENT).catch(debugWarn);
        }
      },
    );

    const onValueChange = () => {
      const nextValue = editor.getContent();
      if (nextValue !== currentValue) {
        currentValue = nextValue;
        emit('update:modelValue', currentValue);
        emit('change', currentValue);
      }
    };

    // disabled
    const disabled = useFormDisabled();

    return () => {
      return (
        <div
          class={[
            bem.b(),
            bem.is('error', formItem?.validateState === 'error'),
            bem.is('disabled', disabled.value),
          ]}
        >
          <Slate
            editor={editor}
            renderElement={editor.renderElement}
            renderLeaf={editor.renderLeaf}
            renderPlaceholder={renderPlaceholder}
            decorate={editor.decorate}
            onValuechange={onValueChange}
          >
            {!props.readonly && !disabled.value && (
              <Toolbar>
                <ButtonGroup>
                  <FormatHeading />
                  <FormatFont />
                  <FormatSize />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatMark format="bold" icon="co:text-bold" />
                  <FormatMark format="italic" icon="co:text-italic" />
                  <FormatMark format="underline" icon="co:text-underline" />
                  <FormatMark format="strikethrough" icon="co:text-strikethrough" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatMark format="superscript" icon="co:text-superscript" />
                  <FormatMark format="subscript" icon="co:text-subscript" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatColor />
                  <FormatBackground />
                </ButtonGroup>
                <ButtonGroup>
                  <ListType format="numbered-list" icon="co:list-numbered" />
                  <ListType format="bulleted-list" icon="co:list-bulleted" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatIndent delta={-1} icon="co:text-indent-less" />
                  <FormatIndent delta={+1} icon="co:text-indent-more" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatAlign format="left" icon="co:text-align-left" />
                  <FormatAlign format="center" icon="co:text-align-center" />
                  <FormatAlign format="right" icon="co:text-align-right" />
                  <FormatAlign format="justify" icon="co:text-align-justify" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatBlockQuote />
                  <FormatMark format="code" icon="co:code" />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatLink />
                  <FormatImage />
                  <FormatVideo />
                  <FormatTable />
                  <FormatCodeBlock />
                  <FormatFormula />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatClear />
                </ButtonGroup>
                <ButtonGroup>
                  <FormatSource />
                </ButtonGroup>
              </Toolbar>
            )}
            <div class={[bem.e('container'), bem.is('focus', isFocus.value)]}>
              <div
                ref={mountPoint}
                class={bem.e('wrapper')}
                style={{
                  height: props.height,
                  maxHeight: props.maxHeight,
                }}
              >
                <Editable
                  placeholder=" "
                  readOnly={props.readonly || disabled.value}
                  class={bem.e('content')}
                  {...{ onFocus: onFocus, onBlur: onBlur, onKeydown: editor.onKeydown }}
                />
              </div>
            </div>
          </Slate>
        </div>
      );
    };
  },
});
