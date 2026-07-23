<template>
  <transition :name="bem.m('fade')" appear mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutSwitchEffect',
});

const bem = createBem('layout-switch-effect');
</script>
