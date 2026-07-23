import { computed, inject, onBeforeUnmount, onMounted, reactive, ref, toRef, unref } from 'vue';
import { type DndSortContext, dndSortContextSymbol, DndSortItemContext } from './dnd-sort.api';
import { useDocumentEvent } from '../../hooks';
import { getCssVar } from '../../utils';

export interface UseDndSortItemOptions {
  index: number;
}

export function useDndSortItem(options: UseDndSortItemOptions) {
  const index = computed(() => unref(options.index));

  const dndSortContext = inject<DndSortContext>(dndSortContextSymbol)!;

  const itemRef = ref<HTMLElement | undefined>();
  const holderRef = ref<HTMLElement | undefined>();

  let downPosY = 0;

  let gap = 0;

  const isPressing = ref(false);

  const translateY = ref(0);

  let prevToIndex = -1;
  let upToIndex = -1;

  const context: DndSortItemContext = reactive({
    offsetY: 0,
    index: toRef(() => index.value),
    el: itemRef,
    squeezed: false,
  });

  onMounted(() => {
    dndSortContext.addItem(context);
  });

  onBeforeUnmount(() => {
    dndSortContext.removeItem(context);
  });

  const onDown = (event: PointerEvent) => {
    holderRef.value?.setPointerCapture(event.pointerId);
    isPressing.value = true;
    downPosY = event.clientY;
    prevToIndex = -1;

    dndSortContext.items.sort((a, b) => a.index - b.index);
    dndSortContext.items.forEach((item) => {
      if (item.el) {
        item.rect = item.el.getBoundingClientRect();
      }
      item.squeezed = item.index !== index.value;
    });

    if (dndSortContext.items.length > 1) {
      const [item0, item1] = dndSortContext.items;
      gap = item1.rect!.top - item0.rect!.bottom;
    }
  };

  const onMove = (event: PointerEvent) => {
    if (!isPressing.value) {
      return;
    }
    event.preventDefault();

    const items = dndSortContext.items;

    const currentIndex = index.value;
    const currentRect = items[currentIndex].rect!;

    const firstRect = items[0].rect!;
    const lastRect = items[items.length - 1].rect!;

    let offsetY = event.clientY - downPosY;
    const minOffsetY = firstRect.top - currentRect.top - 5;
    const maxOffsetY = lastRect.bottom - currentRect.bottom + 5;

    if (offsetY < minOffsetY) {
      offsetY = minOffsetY;
    } else if (offsetY > maxOffsetY) {
      offsetY = maxOffsetY;
    }

    translateY.value = offsetY;

    const cursorOffsetTop = currentRect.top - firstRect.top + offsetY;
    const cursorOffsetBottom = lastRect.bottom - currentRect.bottom - offsetY;

    let toIndex = currentIndex;

    for (let i = offsetY > 0 ? items.length - 1 : 0; i !== currentIndex; offsetY > 0 ? i-- : i++) {
      const item = items[i];
      if (offsetY < 0) {
        const offsetTop = item.rect!.top - firstRect.top;
        const midlineOffsetTop = offsetTop + item.rect!.height / 2;
        if (cursorOffsetTop < midlineOffsetTop) {
          toIndex = i;
          break;
        }
      } else {
        const offsetBottom = lastRect.bottom - item.rect!.bottom;
        const midlineOffsetBottom = offsetBottom + item.rect!.height / 2;
        if (cursorOffsetBottom < midlineOffsetBottom) {
          toIndex = i;
          break;
        }
      }
    }

    if (toIndex !== prevToIndex) {
      prevToIndex = upToIndex = toIndex;

      items.forEach((item) => {
        item.offsetY =
          item.index < currentIndex
            ? item.index >= toIndex
              ? currentRect.height + gap
              : 0
            : item.index > currentIndex
              ? item.index <= toIndex
                ? -currentRect.height - gap
                : 0
              : 0;
      });
    }
  };

  const onUp = (event?: PointerEvent) => {
    if (!isPressing.value) {
      return;
    }
    if (event) {
      holderRef.value?.releasePointerCapture(event.pointerId);
    }
    isPressing.value = false;
    translateY.value = 0;

    dndSortContext.items.forEach((item) => {
      item.offsetY = 0;
      item.squeezed = false;
    });

    if (index.value !== upToIndex) {
      dndSortContext.move(index.value, upToIndex);
    }
  };

  useDocumentEvent('contextmenu', () => {
    onUp();
  });

  return {
    disabled: toRef(() => dndSortContext.disabled),
    isPressing,
    itemRef,
    holderRef,
    itemBinder: reactive({
      style: computed(() => {
        return {
          transition: context.squeezed
            ? `transform ${getCssVar('transition-duration')}`
            : undefined,
          zIndex: isPressing.value ? '2147483647' : undefined,
          transform:
            !isPressing.value && !context.squeezed
              ? undefined
              : `translateY(${isPressing.value ? translateY.value : context.offsetY}px)`,
        };
      }),
    }),
    holderBinder: reactive({
      onPointerdown: onDown,
      onPointermove: onMove,
      onPointerup: onUp,
      onPointercancel: onUp,
    }),
  };
}
