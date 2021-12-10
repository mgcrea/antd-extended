import generatePicker, {
  PickerDateProps,
  PickerProps,
  PickerTimeProps as BasePickerTimeProps,
  RangePickerProps as BaseRangePickerProps,
  RangePickerTimeProps as BaseRangePickerTimeProps,
} from 'antd/es/date-picker/generatePicker';
import dayjs, {Dayjs} from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
export type {EventValue} from 'rc-picker/lib/interface';
import 'antd/lib/date-picker/style/index.less';
import 'antd/lib/time-picker/style/index.less';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;
export type PickerTimeProps = Omit<BasePickerTimeProps<Dayjs>, 'picker'>;
export type RangePickerTimeProps = Omit<BaseRangePickerTimeProps<Dayjs>, 'picker'>;
