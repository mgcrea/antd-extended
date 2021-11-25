// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import {DatePicker as AntDesignDatePicker} from 'antd';
import {RangePickerProps as AntDesignDateRangePickerProps} from 'antd/lib/date-picker';
import type {unitOfTime} from 'moment';
import React, {FunctionComponent, useCallback} from 'react';
import {applySizeProps, SizeType} from './../utils';
import './style/date-picker.less';

const {RangePicker: AntDesignDateRangePicker} = AntDesignDatePicker;

export type DateRangePickerProps = Omit<AntDesignDateRangePickerProps, 'size'> & {
  size?: SizeType;
  startOf?: unitOfTime.Base;
  utc?: boolean;
};

export const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  size,
  className,
  startOf = 'day',
  utc,
  onChange,
  ...otherProps
}) => {
  const applyMomentOptions = useCallback(
    (values: DateRangePickerProps['value']): DateRangePickerProps['value'] => {
      if (!values) {
        return values;
      }
      values.forEach((value) => {
        if (!value) {
          return;
        }
        if (utc) {
          value.utc(true);
        }
        if (startOf) {
          value.startOf(startOf);
        }
      });

      return values;
    },
    [startOf, utc],
  );

  const handleChange = useCallback<NonNullable<DateRangePickerProps['onChange']>>(
    (value, timeString) => {
      applyMomentOptions(value);
      if (onChange) {
        onChange(value, timeString);
      }
    },
    [applyMomentOptions, onChange],
  );

  return (
    <AntDesignDateRangePicker
      onChange={handleChange}
      {...applySizeProps('ant-picker', {size, className})}
      {...otherProps}
    />
  );
};
