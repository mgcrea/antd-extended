// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import type {OpUnitType} from 'dayjs';
import React, {FunctionComponent, useCallback} from 'react';
import {applySizeProps, SizeType} from './../utils';
import {DatePicker as BaseDatePicker, DatePickerProps as BaseDatePickerProps} from './Picker';
import 'antd/lib/date-picker/style/index.less';
import './style/date-picker.less';

export type DatePickerProps = Omit<BaseDatePickerProps, 'size'> & {
  size?: SizeType;
  startOf?: OpUnitType;
  utc?: boolean;
};

type Defined<T> = T extends undefined ? never : T;
export type DatePickerValue = Defined<DatePickerProps['value']>;

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  size,
  className,
  startOf = 'day',
  utc,
  onChange,
  ...otherProps
}) => {
  const applyDateOptions = useCallback(
    (nextValue: DatePickerValue): DatePickerValue => {
      let value = nextValue;
      if (!value) {
        return value;
      }
      if (utc) {
        value = value.utc(true);
      }
      if (startOf) {
        value = value.startOf(startOf);
      }
      return value;
    },
    [startOf, utc],
  );

  const handleChange = useCallback<NonNullable<DatePickerProps['onChange']>>(
    (value, timeString) => {
      const nextValue = applyDateOptions(value);
      if (onChange) {
        onChange(nextValue, timeString);
      }
    },
    [applyDateOptions, onChange],
  );

  return (
    <BaseDatePicker onChange={handleChange} {...applySizeProps('ant-picker', {size, className})} {...otherProps} />
  );
};
