// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import {DatePicker as AntDesignDatePicker} from 'antd';
import {DatePickerProps as AntDesignDatePickerProps} from 'antd/lib/date-picker';
import {unitOfTime} from 'moment';
import React, {FunctionComponent, useCallback} from 'react';
import {applySizeProps, SizeType} from './../utils';

export type DatePickerProps = Omit<AntDesignDatePickerProps, 'size'> & {
  size?: SizeType;
  startOf?: unitOfTime.Base;
  utc?: boolean;
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  size,
  className,
  startOf = 'day',
  utc,
  onChange,
  ...otherProps
}) => {
  const applyMomentOptions = useCallback(
    (value: DatePickerProps['value']): DatePickerProps['value'] => {
      if (!value) {
        return value;
      }
      if (utc) {
        value.utc(true);
      }
      if (startOf) {
        value.startOf(startOf);
      }
      return value;
    },
    [startOf, utc],
  );

  const handleChange = useCallback<NonNullable<DatePickerProps['onChange']>>(
    (value, timeString) => {
      applyMomentOptions(value);
      if (onChange) {
        onChange(value, timeString);
      }
    },
    [applyMomentOptions, onChange],
  );

  return (
    <AntDesignDatePicker onChange={handleChange} {...applySizeProps('ant-picker', {size, className})} {...otherProps} />
  );
};
