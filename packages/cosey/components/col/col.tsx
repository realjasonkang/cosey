import { computed, CSSProperties, defineComponent, inject, h } from 'vue';
import { type ColSize, colProps, colSlots } from './col.api';
import { type RowContext, type RowSize, rowContextSymbol, rowSizes } from '../row';
import { isNumber, isObject, createBem } from '../../utils';

export default defineComponent({
  name: 'CoCol',
  props: colProps,
  slots: colSlots,
  setup(props, { slots }) {
    const bem = createBem('col');

    const rowContext = inject<RowContext>(rowContextSymbol, {
      gutter: 0,
      currentSize: 'xs',
    });

    const colClass = computed(() => {
      const classes: string[] = [];
      const pos = ['span', 'offset', 'pull', 'push'] as const;

      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === 'span') classes.push(bem.m(size));
          else if (size > 0) classes.push(bem.m(`${prop}-${size}`));
        }
      });

      const sizes: [RowSize, ColSize][] = [];
      rowSizes.forEach((size) => {
        const sizeValue = props[size];
        if (sizeValue) {
          sizes.push([size, sizeValue]);
        } else {
          const last = sizes[sizes.length - 1];
          if (last) {
            sizes.push([size, last[1]]);
          }
        }
      });

      sizes.forEach(([size, sizeValue]) => {
        if (isNumber(sizeValue)) {
          classes.push(bem.m(`${size}-${sizeValue}`));
        } else if (isObject(sizeValue)) {
          Object.entries(sizeValue).forEach(([prop, value]) => {
            classes.push(
              prop === 'span' ? bem.m(`${size}-${value}`) : bem.m(`${size}-${prop}-${value}`),
            );
          });
        }
      });

      if (rowContext.gutter) {
        classes.push(bem.m('guttered'));
      }

      return [bem.b(), bem.m(rowContext.currentSize), classes];
    });

    const colStyle = computed(() => {
      const styles: CSSProperties = {};
      if (rowContext.gutter) {
        styles.paddingInlineStart = styles.paddingInlineEnd = `${rowContext.gutter / 2}px`;
      }
      return styles;
    });

    return () => {
      return h(
        props.tag,
        {
          class: colClass.value,
          style: colStyle.value,
        },
        slots,
      );
    };
  },
});
