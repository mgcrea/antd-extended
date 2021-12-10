// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import {applySizeProps, SizeType} from './../utils';
import React, {FunctionComponent} from 'react';
import {DatePicker, RangePickerTimeProps} from './../date-picker/Picker';
import 'antd/lib/time-picker/style/index.less';

const {RangePicker: InternalRangePicker} = DatePicker;

export type TimeRangePickerProps = Omit<RangePickerTimeProps, 'size'> & {
  size?: SizeType;
};

export const TimeRangePicker: FunctionComponent<TimeRangePickerProps> = ({size, className, ...otherProps}) => {
  return <InternalRangePicker {...applySizeProps('ant-picker', {size, className})} {...otherProps} />;
};
