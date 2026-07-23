import {
  computed,
  inject,
  MaybeRefOrGetter,
  provide,
  reactive,
  toValue,
  type ExtractPropTypes,
  type InjectionKey,
  type SlotsType,
} from 'vue';

export const containerProps = {
  fullPage: {
    type: Boolean,
  },
};

export type ContainerProps = ExtractPropTypes<typeof containerProps>;

export interface ContainerSlots {
  default: {};
}

export const containerSlots = Object as SlotsType<ContainerSlots>;

export const containerContextKey = Symbol('containerContext') as InjectionKey<{
  height: string;
}>;

export function useContainerProvide(height: MaybeRefOrGetter<number>) {
  provide(
    containerContextKey,
    reactive({
      height: computed(() => `calc(100vh - ${toValue(height)}px)`),
    }),
  );
}

export function useContainer() {
  const context = inject(containerContextKey, null);

  return context;
}
