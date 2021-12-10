// @docs https://ant.design/components/date-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/date-picker

import type {Dayjs, OpUnitType} from 'dayjs';
import React, {FunctionComponent, useCallback} from 'react';
import {applySizeProps, SizeType} from './../utils';
import {DatePicker as BaseDatePicker, EventValue, RangePickerProps as BaseRangePickerProps} from './Picker';

const {RangePicker: BaseDateRangePicker} = BaseDatePicker;

export type DateRangePickerProps = Omit<BaseRangePickerProps, 'size'> & {
  size?: SizeType;
  startOf?: OpUnitType;
  utc?: boolean;
};

type Defined<T> = T extends undefined ? never : T;
export type DateRangePickerValue = Defined<DateRangePickerProps['value']>;

export const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  size,
  className,
  startOf = 'day',
  utc,
  onChange,
  ...otherProps
}) => {
  const applyDateOptions = useCallback(
    (values: DateRangePickerValue): DateRangePickerValue => {
      if (!values) {
        return values;
      }
      return values.map((nextValue) => {
        let value = nextValue;
        if (!value) {
          return;
        }
        if (utc) {
          value = value.utc(true);
        }
        if (startOf) {
          value = value.startOf(startOf);
        }
        return value;
      }) as [EventValue<Dayjs>, EventValue<Dayjs>];
    },
    [startOf, utc],
  );

  const handleChange = useCallback<NonNullable<DateRangePickerProps['onChange']>>(
    (values, timeString) => {
      const nextValues = applyDateOptions(values);
      if (onChange) {
        onChange(nextValues, timeString);
      }
    },
    [applyDateOptions, onChange],
  );

  return (
    <BaseDateRangePicker onChange={handleChange} {...applySizeProps('ant-picker', {size, className})} {...otherProps} />
  );
};
