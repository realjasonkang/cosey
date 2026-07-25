<script lang="ts">
import { ElIcon, ElInput, useNamespace } from 'element-plus';
import { computed, defineComponent, h, mergeProps, ref, type SlotsType } from 'vue';
import { type FieldPasswordProps, type FieldPasswordSlots } from './password.api';
import { addNullablePlaceholder } from '../../../../utils';
import { Hide as IconHide, View as IconView } from '@element-plus/icons-vue';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldPasswordProps, { slots }) => {
    const { t } = useLocale();

    const nsInput = useNamespace('input');

    const passwordVisible = ref(false);

    const passwordIcon = computed(() => (passwordVisible.value ? IconView : IconHide));

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;

        return addNullablePlaceholder(value, (val) =>
          h(
            'span',
            {
              class: nsInput.b(),
            },
            [
              passwordVisible.value ? val : '********',
              h(
                ElIcon,
                {
                  class: [nsInput.e('icon'), nsInput.e('password')],
                  onClick: handlePasswordVisible,
                },
                () => h(passwordIcon.value),
              ),
            ],
          ),
        );
      }

      return h(
        ElInput,
        mergeProps(
          {
            placeholder: t('co.common.pleaseInput'),
            clearable: true,
            showPassword: true,
            type: 'password',
            style: {
              display: 'flex',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'CoFieldPassword',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldPasswordSlots>,
  },
);
</script>
