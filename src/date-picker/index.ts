export * from './DatePicker';
export * from './DateRangePicker';

import {DatePicker as BaseDatePicker} from './DatePicker';
import {DateRangePicker} from './DateRangePicker';

export const DatePicker = Object.assign(BaseDatePicker, {
  RangePicker: DateRangePicker,
});
