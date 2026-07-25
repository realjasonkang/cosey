import { computed, defineComponent, onBeforeMount, reactive, ref, unref, h } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';
import {
  type TableQueryExpose,
  type TableQueryCustomExpose,
  omittedTableQueryProps,
  tableQueryExposeKeys,
  tableQueryProps,
  tableQuerySlots,
  tableQueryEmits,
} from './table-query.api';
import { createMergedExpose, isObject } from '../../utils';
import { FormItem } from '../form';
import { FormQuery, type FormQueryExpose } from '../form-query';

export default defineComponent({
  name: 'CoTableQuery',
  props: tableQueryProps,
  slots: tableQuerySlots,
  emits: tableQueryEmits,
  setup(props, { expose }) {
    const formQueryProps = reactiveOmit(props, omittedTableQueryProps);

    const formQueryRef = ref<FormQueryExpose>();

    const defaultModel = reactive<Record<string, any>>({});

    const formModel = computed(() => {
      return props.model || defaultModel;
    });

    onBeforeMount(() => {
      if (!props.model) {
        props.schemes.forEach((item) => {
          unref(formModel)[item.prop as string] = item.modelValue;
        });
      }
    });

    const onEnter = () => {
      formQueryRef.value?.submit();
    };

    // expose
    const setFieldsValue: TableQueryCustomExpose['setFieldsValue'] = (values) => {
      Object.assign(unref(formModel), values);
    };

    const reset: TableQueryCustomExpose['reset'] = (values) => {
      formQueryRef.value?.reset(() => {
        if (values) {
          setFieldsValue(values);
        }
      });
    };

    const customExpose: TableQueryCustomExpose = {
      getFieldsValue() {
        return cloneDeep(unref(formModel));
      },
      setFieldsValue,
      getFormModel() {
        return unref(formModel);
      },
      reset,
    };

    expose<TableQueryExpose>(
      createMergedExpose(tableQueryExposeKeys, () => formQueryRef.value, customExpose),
    );

    return () => {
      return h(
        FormQuery,
        {
          ...formQueryProps,
          ref: formQueryRef,
          model: unref(formModel),
          onKeyup: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onEnter();
            }
          },
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          },
        },
        () => {
          return props.schemes.filter(isObject).map((item) => {
            const { slots, render, ...rest } = item;

            if (render) {
              return h(FormItem, rest, {
                ...slots,
                default: () => {
                  return render({ model: unref(formModel) });
                },
              });
            }

            return h(
              FormItem,
              {
                ...rest,
                modelValue: unref(formModel)[rest.prop as string],
                'onUpdate:modelValue': (value: any) =>
                  (unref(formModel)[rest.prop as string] = value),
              },
              slots,
            );
          });
        },
      );
    };
  },
});
