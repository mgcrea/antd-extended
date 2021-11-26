// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import {TimePicker as AntDesignTimePicker} from 'antd';
import {TimeRangePickerProps as AntDesignTimeRangePickerProps} from 'antd/lib/time-picker';
import {applySizeProps, SizeType} from './../utils';
import React, {FunctionComponent} from 'react';

const {RangePicker: AntDesignTimeRangePicker} = AntDesignTimePicker;

export type TimeRangePickerProps = Omit<AntDesignTimeRangePickerProps, 'size'> & {
  size?: SizeType;
};

export const TimeRangePicker: FunctionComponent<TimeRangePickerProps> = ({size, className, ...otherProps}) => {
  return <AntDesignTimeRangePicker {...applySizeProps('ant-picker', {size, className})} {...otherProps} />;
};
