import { defineComponent, inject, reactive, ref, toRef, watch } from 'vue';
import {
  type FormProps,
  type FormBubbleContext,
  formProps,
  formBubbleContextSymbol,
  formSlots,
  formEmits,
} from './form.api';
import { ElForm, ElButton } from 'element-plus';
import { useFormTemplate } from './useFormTemplate';
import { Row } from '../row';
import { OptionalWrapper } from '../optional-wrapper';
import FormItem from './form-item.vue';
import { createBem } from '../../utils';
import { useLocale } from '../../hooks';
import { useLayoutStore } from '../../store';

export default defineComponent({
  name: 'CoForm',
  props: formProps,
  slots: formSlots,
  emits: formEmits,
  setup(props, { slots, expose: _expose }) {
    const bem = createBem('form');

    const { t } = useLocale();

    const { elFormProps, expose, reset, resetFields, submit, clearValidate, submitting } =
      useFormTemplate<FormProps>(props);

    const formBubbleContext = inject<FormBubbleContext | null>(formBubbleContextSymbol, null);

    formBubbleContext?.setFormBubbleData(
      reactive({
        readonly: toRef(() => props.readonly),
        submitting,
        reset,
        resetFields,
        clearValidate,
        submit,
      }),
    );

    const innerInline = ref(props.inline);

    const layoutStore = useLayoutStore();

    watch(
      () => layoutStore.isMobile,
      (isMobile) => {
        innerInline.value = isMobile ? false : props.inline;
      },
      {
        immediate: true,
      },
    );

    _expose(expose);

    return () => {
      return (
        <ElForm
          ref="form"
          {...elFormProps}
          inline={innerInline.value}
          class={bem.b()}
          {...{
            onSubmit: (event: SubmitEvent) => {
              event.preventDefault();

              if (formBubbleContext) {
                formBubbleContext.confirm();
              } else {
                submit();
              }
            },
          }}
        >
          <OptionalWrapper when={props.grid} component={Row} props={props.rowProps}>
            {slots.default?.({})}
            {!props.readonly && !formBubbleContext && !props.hideButtons && (
              <FormItem class={bem.bem('form', 'form-item-buttons')}>
                {{
                  label: () => {},
                  default: () => (
                    <div>
                      {slots.button ? (
                        slots.button({
                          reset,
                          submit,
                          submitting: submitting.value,
                        })
                      ) : (
                        <>
                          {!props.hideSubmit && (
                            <ElButton
                              type="primary"
                              {...props.submitProps}
                              loading={submitting.value}
                              onClick={() => submit()}
                            >
                              {t(props.submitText)}
                            </ElButton>
                          )}
                          {!props.hideReset && (
                            <ElButton {...props.resetProps} onClick={() => reset()}>
                              {t(props.resetText)}
                            </ElButton>
                          )}
                        </>
                      )}
                    </div>
                  ),
                }}
              </FormItem>
            )}
          </OptionalWrapper>
        </ElForm>
      );
    };
  },
});
