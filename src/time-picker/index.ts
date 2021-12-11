export * from './TimePicker';
export * from './TimeSlotPicker';
export * from './TimeRangePicker';

import {TimePicker as BaseTimePicker} from './TimePicker';
import {TimeRangePicker} from './TimeRangePicker';

export const TimePicker = Object.assign(BaseTimePicker, {
  RangePicker: TimeRangePicker,
});
