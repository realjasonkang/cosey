import { descriptionsProps, descriptionsSlots, descriptionsEmits } from './descriptions.api';
import { createBem } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CoDescriptions',
  props: descriptionsProps,
  slots: descriptionsSlots,
  emits: descriptionsEmits,
  setup(props) {
    const bem = createBem('descriptions');

    return () => {
      return (
        <table
          class={[
            bem.b(),
            bem.is(`label-${props.labelAlign}`),
            bem.is('bordered', props.border),
            bem.has('colon', props.colon),
          ]}
        >
          <tbody>
            {props.data?.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    return (
                      <td key={j}>
                        <span>{cell}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };
  },
});
