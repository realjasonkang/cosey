import { type PropType } from 'vue';

import { type FieldAutocompleteProps } from './components/autocomplete/autocomplete.api';
import { type FieldCascaderProps } from './components/cascader/cascader.api';
import { type FieldCheckboxGroupProps } from './components/checkbox-group/checkbox-group.api';
import { type FieldCheckboxProps } from './components/checkbox/checkbox.api';
import { type FieldColorProps } from './components/color/color.api';
import { type FieldDateProps } from './components/date/date.api';
import { type FieldDateRangeProps } from './components/date-range/date-range.api';
import { type FieldDateTimeProps } from './components/date-time/date-time.api';
import { type FieldDateTimeRangeProps } from './components/date-time-range/date-time-range.api';
import { type FieldDatesProps } from './components/dates/dates.api';
import { type FieldEditorProps } from './components/editor/editor.api';
import { type FieldInputProps } from './components/input/input.api';
import { type FieldInputTagProps } from './components/input-tag/input-tag.api';
import { type FieldMentionProps } from './components/mention/mention.api';
import { type FieldMonthProps } from './components/month/month.api';
import { type FieldMonthRangeProps } from './components/month-range/month-range.api';
import { type FieldMonthsProps } from './components/months/months.api';
import { type FieldNumberProps } from './components/number/number.api';
import { type FieldNumberRangeProps } from './components/number-range/number-range.api';
import { type FieldPasswordProps } from './components/password/password.api';
import { type FieldRadioGroupProps } from './components/radio-group/radio-group.api';
import { type FieldRateProps } from './components/rate/rate.api';
import { type FieldRemoteSelectProps } from './components/remote-select/remote-select.api';
import { type FieldSegmentedProps } from './components/segmented/segmented.api';
import { type FieldSelectProps } from './components/select/select.api';
import { type FieldSelectV2Props } from './components/select-v2/select-v2.api';
import { type FieldSliderProps } from './components/slider/slider.api';
import { type FieldSwitchProps } from './components/switch/switch.api';
import { type FieldTextareaProps } from './components/textarea/textarea.api';
import { type FieldTimeProps } from './components/time/time.api';
import { type FieldTimeRangeProps } from './components/time-range/time-range.api';
import { type FieldTimeSelectProps } from './components/time-select/time-select.api';
import { type FieldTransferProps } from './components/transfer/transfer.api';
import { type FieldTreeSelectProps } from './components/tree-select/tree-select.api';
import { type FieldUploadProps } from './components/upload/upload.api';
import { type FieldWeekProps } from './components/week/week.api';
import { type FieldWeekRangeProps } from './components/week-range/week-range.api';
import { type FieldYearProps } from './components/year/year.api';
import { type FieldYearRangeProps } from './components/year-range/year-range.api';
import { type FieldYearsProps } from './components/years/years.api';

import Autocomplete from './components/autocomplete/autocomplete.vue';
import Cascader from './components/cascader/cascader.vue';
import Checkbox from './components/checkbox/checkbox.vue';
import CheckboxGroup from './components/checkbox-group/checkbox-group.vue';
import Color from './components/color/color.vue';
import Date from './components/date/date.vue';
import DateRange from './components/date-range/date-range.vue';
import DateTime from './components/date-time/date-time.vue';
import DateTimeRange from './components/date-time-range/date-time-range.vue';
import Dates from './components/dates/dates.vue';
import Editor from './components/editor/editor.vue';
import Input from './components/input/input.vue';
import InputTag from './components/input-tag/input-tag.vue';
import Mention from './components/mention/mention.vue';
import Month from './components/month/month.vue';
import MonthRange from './components/month-range/month-range.vue';
import Months from './components/months/months.vue';
import Number from './components/number/number.vue';
import NumberRange from './components/number-range/number-range.vue';
import Password from './components/password/password.vue';
import RadioGroup from './components/radio-group/radio-group.vue';
import Rate from './components/rate/rate.vue';
import RemoteSelect from './components/remote-select/remote-select';
import Segmented from './components/segmented/segmented.vue';
import Select from './components/select/select.vue';
import SelectV2 from './components/select-v2/select-v2.vue';
import Slider from './components/slider/slider.vue';
import Switch from './components/switch/switch.vue';
import Textarea from './components/textarea/textarea.vue';
import Time from './components/time/time.vue';
import TimeRange from './components/time-range/time-range.vue';
import TimeSelect from './components/time-select/time-select.vue';
import Transfer from './components/transfer/transfer.vue';
import TreeSelect from './components/tree-select/tree-select.vue';
import Upload from './components/upload/upload.vue';
import Week from './components/week/week.vue';
import WeekRange from './components/week-range/week-range.vue';
import Year from './components/year/year.vue';
import YearRange from './components/year-range/year-range.vue';
import Years from './components/years/years.vue';

export interface MapFieldTypeComponentProps {
  autocomplete: FieldAutocompleteProps;
  cascader: FieldCascaderProps;
  checkbox: FieldCheckboxProps;
  checkboxgroup: FieldCheckboxGroupProps;
  color: FieldColorProps;
  date: FieldDateProps;
  daterange: FieldDateRangeProps;
  dates: FieldDatesProps;
  editor: FieldEditorProps;
  datetime: FieldDateTimeProps;
  datetimerange: FieldDateTimeRangeProps;
  input: FieldInputProps;
  inputtag: FieldInputTagProps;
  mention: FieldMentionProps;
  month: FieldMonthProps;
  monthrange: FieldMonthRangeProps;
  months: FieldMonthsProps;
  number: FieldNumberProps;
  numberrange: FieldNumberRangeProps;
  password: FieldPasswordProps;
  radiogroup: FieldRadioGroupProps;
  rate: FieldRateProps;
  remoteselect: FieldRemoteSelectProps;
  segmented: FieldSegmentedProps;
  select: FieldSelectProps;
  selectv2: FieldSelectV2Props;
  slider: FieldSliderProps;
  switch: FieldSwitchProps;
  textarea: FieldTextareaProps;
  time: FieldTimeProps;
  timerange: FieldTimeRangeProps;
  timeselect: FieldTimeSelectProps;
  transfer: FieldTransferProps;
  treeselect: FieldTreeSelectProps;
  upload: FieldUploadProps;
  week: FieldWeekProps;
  weekrange: FieldWeekRangeProps;
  year: FieldYearProps;
  yearrange: FieldYearRangeProps;
  years: FieldYearsProps;
  custom: Record<string, any>;
}

export const mapFieldTypeComponent = {
  autocomplete: Autocomplete,
  cascader: Cascader,
  checkbox: Checkbox,
  checkboxgroup: CheckboxGroup,
  color: Color,
  date: Date,
  daterange: DateRange,
  dates: Dates,
  editor: Editor,
  datetime: DateTime,
  datetimerange: DateTimeRange,
  input: Input,
  inputtag: InputTag,
  mention: Mention,
  month: Month,
  monthrange: MonthRange,
  months: Months,
  number: Number,
  numberrange: NumberRange,
  password: Password,
  radiogroup: RadioGroup,
  rate: Rate,
  remoteselect: RemoteSelect,
  segmented: Segmented,
  select: Select,
  selectv2: SelectV2,
  slider: Slider,
  switch: Switch,
  textarea: Textarea,
  time: Time,
  timerange: TimeRange,
  timeselect: TimeSelect,
  transfer: Transfer,
  treeselect: TreeSelect,
  upload: Upload,
  week: Week,
  weekrange: WeekRange,
  year: Year,
  yearrange: YearRange,
  years: Years,
  custom: {
    name: 'FieldCustom',
  },
};

export type FieldType = keyof MapFieldTypeComponentProps;

export interface FeildProps<T extends FieldType> {
  readonly?: boolean;
  type?: T;
  componentProps?: MapFieldTypeComponentProps[T]['componentProps'];
  componentSlots?: MapFieldTypeComponentProps[T]['componentSlots'];
  componentRef?: (el: any) => void;
}

export const fieldProps = {
  readonly: {
    type: Boolean,
  },
  type: {
    type: String as PropType<FieldType>,
  },
  componentProps: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentProps']>,
  },
  componentSlots: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentSlots']>,
  },
  componentRef: {
    type: Function as PropType<(el: any) => void>,
  },
};

export * from './components/common';
