export * from './TimePicker';
export * from './TimeSlotPicker';
export * from './TimeSlotListPicker';
export * from './TimeRangePicker';

import {TimePicker as BaseTimePicker} from './TimePicker';
import {TimeRangePicker} from './TimeRangePicker';
import {TimeSlotPicker} from './TimeSlotPicker';
import {TimeSlotListPicker} from './TimeSlotListPicker';

export const TimePicker = Object.assign(BaseTimePicker, {
  RangePicker: TimeRangePicker,
  SlotPicker: TimeSlotPicker,
  SlotListPicker: TimeSlotListPicker,
});
