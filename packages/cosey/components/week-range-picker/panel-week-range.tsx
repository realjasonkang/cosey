import { computed, defineComponent, ref, shallowRef, watch } from 'vue';
import { ElIcon } from 'element-plus';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
import weekYear from 'dayjs/plugin/weekYear.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import {
  panelWeekRangeEmits,
  panelWeekRangeProps,
  panelWeekRangeSlots,
  WeekInfo,
} from './panel-week-range.api';
import { isValidRange } from 'element-plus/es/components/date-picker-panel/src/utils.mjs';
import { useLocale } from '../../hooks';
import { createBem } from '../../utils';

dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

function parseDates(dates: Date[] | null | undefined) {
  if (!dates || dates.length < 2) return [];
  const d = dates.map(dayjs).sort((a, b) => (a.isBefore(b) ? -1 : 1));
  return [d[0].startOf('date'), d[1].endOf('week')];
}

function isSame(d1: Dayjs[], d2: Dayjs[]) {
  return d1.every((d, i) => d.isSame(d2[i]));
}

export default defineComponent({
  name: 'CoPanelWeekRange',
  props: panelWeekRangeProps,
  slots: panelWeekRangeSlots,
  emits: panelWeekRangeEmits,

  setup(props, { emit }) {
    const { t } = useLocale();

    const bem = createBem('panel-week-range');

    const currentYearDate = shallowRef(dayjs());

    const yearLabel = computed(() => currentYearDate.value.year());

    const weeks = computed<WeekInfo[][]>(() => {
      const currentD = currentYearDate.value;
      const weeks = currentD.isoWeeksInYear();

      const result: WeekInfo[][] = [];

      for (let i = 0; i < weeks; i++) {
        const rowIndex = Math.floor(i / 8);
        const row = (result[rowIndex] ??= []);
        const week = i + 1;
        const d = currentD.week(week);
        const startDate = d.startOf('week');
        const endDate = d.endOf('week');
        const startStr = startDate.format('MM-DD');
        const endStr = endDate.format('MM-DD');
        const weekStr = t('co.form.week', { w: week });
        row.push({
          id: currentD.year() * 100 + week,
          week,
          weekStr,
          startDate,
          endDate,
          startStr,
          endStr,
        });
      }

      return result;
    });

    const pickedDates = ref<WeekInfo[]>([]);

    const innerValue = ref<Dayjs[]>([]);

    const selectedDates = ref<number[]>([]);

    watch(
      () => props.parsedValue,
      () => {
        const dates = parseDates(props.parsedValue);
        if (
          dates.length !== innerValue.value.length ||
          (dates.length > 0 && !isSame(dates, innerValue.value))
        ) {
          innerValue.value = dates;

          selectedDates.value = innerValue.value
            .map((item) => item.year() * 100 + item.week())
            .sort();
        }
      },
      { immediate: true },
    );

    const isSelecting = computed(() => pickedDates.value.length === 1);

    const onPrevYear = () => {
      currentYearDate.value = dayjs(currentYearDate.value).subtract(1, 'year');
    };

    const onNextYear = () => {
      currentYearDate.value = dayjs(currentYearDate.value).add(1, 'year');
    };

    const getWeekInfo = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('td');

      if (!target) return;

      const rowIndex = (target.parentNode as HTMLTableRowElement).rowIndex;
      const cellIndex = (target as HTMLTableCellElement).cellIndex;
      const weekInfo = weeks.value[rowIndex][cellIndex];

      return weekInfo;
    };

    const onPickWeek = (event: MouseEvent) => {
      const weekInfo = getWeekInfo(event);
      if (!weekInfo) return;

      if (pickedDates.value.length === 2) {
        pickedDates.value = [];
      }
      pickedDates.value.push(weekInfo);
      pickedDates.value.sort((a, b) => a.id - b.id);

      selectedDates.value = pickedDates.value.map((item) => item.id);
      if (selectedDates.value.length === 1) {
        const d = selectedDates.value[0];
        selectedDates.value = [d, d];
      }

      if (pickedDates.value.length === 2) {
        const [start, end] = pickedDates.value;
        emit('pick', [start.startDate, end.endDate]);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isSelecting.value) return;

      const weekInfo = getWeekInfo(event);
      if (!weekInfo) return;

      selectedDates.value = [pickedDates.value[0].id, weekInfo.id].sort();
    };

    const resetCurrentYear = (year: number) => {
      const currentYear = currentYearDate.value.year();
      if (year !== currentYear) {
        currentYearDate.value = dayjs(innerValue.value[0]);
      }
    };

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          if (isSelecting.value) {
            selectedDates.value = innerValue.value.length
              ? innerValue.value.map((item) => item.year() * 100 + item.week()).sort()
              : [];
            pickedDates.value = [];
          }
          resetCurrentYear(innerValue.value.length ? innerValue.value[0].year() : dayjs().year());
        }
      },
    );

    const isValidValue = (date: [Dayjs, Dayjs]) => {
      return isValidRange(date);
    };

    const formatToString = (value: Dayjs[] | Dayjs) => {
      return Array.isArray(value)
        ? value.map((d) => d.format('gggg[w]ww'))
        : value.format('gggg[w]ww');
    };

    emit('set-picker-option', ['isValidValue', isValidValue]);
    emit('set-picker-option', ['formatToString', formatToString]);

    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e('header')}>
            <div class={bem.e('prev-btn')}>
              <button class={bem.e('icon-btn')} onClick={onPrevYear}>
                <ElIcon>
                  <DArrowLeft />
                </ElIcon>
              </button>
            </div>
            <span role="button" class={bem.e('header-label')}>
              {yearLabel.value}
            </span>
            <div class={bem.e('next-btn')}>
              <button class={bem.e('icon-btn')} onClick={onNextYear}>
                <ElIcon>
                  <DArrowRight />
                </ElIcon>
              </button>
            </div>
          </div>
          <div class={bem.e('content')}>
            <table onClick={onPickWeek} onMousemove={onMouseMove}>
              <tbody>
                {weeks.value.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((weekInfo, j) => {
                        const [start, end] = selectedDates.value;
                        return (
                          <td
                            key={j}
                            class={[
                              bem.e('td'),
                              bem.is('start', start === weekInfo.id),
                              bem.is('end', end === weekInfo.id),
                              bem.is('in-range', start <= weekInfo.id && weekInfo.id <= end),
                            ]}
                          >
                            <div class={bem.e('cell')}>
                              <div class={bem.e('cell-text')}>
                                <div>{weekInfo.weekStr}</div>
                                <div>{`${weekInfo.startStr}~${weekInfo.endStr}`}</div>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
  },
});
