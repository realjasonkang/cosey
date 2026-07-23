<template>
  <Panel :max-height="maxHeight">
    <template #header>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        {{ t('co.editor.checkAll') }}
      </el-checkbox>
      <div :style="{ marginInlineStart: 'auto', fontSize: getCssVar('font-size-small') }">
        {{ modelValue.length }} / {{ options.length }}
      </div>
    </template>
    <slot></slot>
  </Panel>
</template>

<script lang="ts" setup>
import { type CheckboxValueType } from 'element-plus';
import { ref, watch } from 'vue';
import { Panel } from '../../../panel';
import { getCssVar } from '../../../../utils';
import { useLocale } from '../../../../hooks';

defineOptions({
  name: 'CoCheckboxGroupPanel',
});

const props = defineProps<{
  modelValue: any[];
  options: {
    value: any;
    [k: PropertyKey]: any;
  }[];
  maxHeight?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
}>();

const { t } = useLocale();

const checkAll = ref(false);
const isIndeterminate = ref(true);

watch(
  () => props.modelValue,
  () => {
    const checkedCount = props.modelValue.length;
    checkAll.value = checkedCount === props.options.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < props.options.length;
  },
  {
    immediate: true,
  },
);

const handleCheckAllChange = (val: CheckboxValueType) => {
  const nextValue = val ? props.options.map((option) => option.value) : [];
  emit('update:modelValue', nextValue);
  isIndeterminate.value = false;
};
</script>
