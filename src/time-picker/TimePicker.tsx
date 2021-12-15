// @docs https://ant.design/components/time-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/time-picker

import 'antd/lib/time-picker/style/index.less';
import dayjs, {OpUnitType} from 'dayjs';
import React, {FunctionComponent, useCallback, useMemo, useRef} from 'react';
import {DatePicker, PickerTimeProps} from './../date-picker/Picker';
import {applySizeProps, integerArraySuite, SizeType} from './../utils';
import './style/time-picker.less';

const {TimePicker: InternalTimePicker} = DatePicker;

type Defined<T> = T extends undefined ? never : T;
export type TimePickerValue = Defined<PickerTimeProps['value']>;

export type TimePickerProps = Omit<PickerTimeProps, 'picker' | 'size' | 'onSelect'> & {
  size?: SizeType;
  startOf?: OpUnitType;
  onSelect?: (value: TimePickerValue) => void;
  isBefore?: TimePickerValue;
  isAfter?: TimePickerValue;
  utc?: boolean;
};

export const TimePicker: FunctionComponent<TimePickerProps> = ({
  size,
  className,
  onSelect,
  onChange,
  onBlur,
  value: valueProp,
  disabledHours,
  disabledMinutes,
  format,
  startOf = 'second',
  isBefore: isBeforeProp,
  isAfter: isAfterProp,
  utc,
  ...otherProps
}) => {
  const lastSelectedValue = useRef<TimePickerValue>(valueProp || null);

  const applyDateOptions = useCallback(
    (nextValue: TimePickerValue): TimePickerValue => {
      if (!nextValue) {
        return nextValue;
      }
      let value = nextValue;
      if (utc) {
        // @NOTE Keep existing date for utc-like values to allow overflowing
        const nextDate = value.year() === 1970 && value.month() === 0 ? value.date() : 1;
        value = value.year(1970).month(0).date(nextDate).utc(true);
      }
      if (startOf) {
        value = value.startOf(startOf);
      }
      return value;
    },
    [startOf, utc],
  );

  const isBefore = useMemo<TimePickerValue>(
    () => (isBeforeProp ? applyDateOptions(dayjs(isBeforeProp).clone()) : null),
    [applyDateOptions, isBeforeProp],
  );
  const isAfter = useMemo<TimePickerValue>(
    () => (isAfterProp ? applyDateOptions(dayjs(isAfterProp).clone()) : null),
    [applyDateOptions, isAfterProp],
  );
  const isBeforeOverflows = utc && isBefore && isBefore.date() > 1;
  const isAfterOverflows = utc && isAfter && isAfter.date() > 1;

  const performOnSelect = useCallback<NonNullable<TimePickerProps['onSelect']>>(
    (value) => {
      if (!onSelect) {
        return;
      }
      if (isBefore) {
        if (value && value.isSameOrAfter(isBefore)) {
          onSelect(isBefore.clone().subtract(1, startOf));
          return;
        }
      }
      if (isAfter && !isBeforeOverflows) {
        if (value && value.isSameOrBefore(isAfter)) {
          onSelect(isAfter.clone().add(1, startOf));
          return;
        }
      }
      const nextValue = value && isAfterOverflows ? value.clone().add(1, 'day') : value;
      onSelect(nextValue);
    },
    [isBefore, isBeforeOverflows, isAfter, isAfterOverflows, startOf, onSelect],
  );

  const handleSelect = useCallback<NonNullable<TimePickerProps['onSelect']>>(
    (nextValue) => {
      const value = applyDateOptions(nextValue);
      lastSelectedValue.current = value;
      performOnSelect(value);
    },
    [performOnSelect, applyDateOptions],
  );

  const handleBlur = useCallback<NonNullable<TimePickerProps['onBlur']>>(
    (ev) => {
      if (onBlur) {
        onBlur(ev);
      }
      const {current: value} = lastSelectedValue;
      if (!value) {
        return;
      }
      if (onChange && value.toISOString() !== valueProp?.toISOString()) {
        onChange(value, value.format(`${format}`));
      }
    },
    [onBlur, onChange, format, valueProp],
  );

  const handleChange = useCallback<NonNullable<TimePickerProps['onChange']>>(
    (nextValue, timeString) => {
      const value = applyDateOptions(nextValue);
      if (onChange) {
        onChange(value, timeString);
      }
    },
    [applyDateOptions, onChange],
  );

  const lazyDisabledHours = useMemo<ReturnType<NonNullable<TimePickerProps['disabledHours']>>>(() => {
    const values = disabledHours ? disabledHours() : [];
    const isDisabledInside = isBeforeOverflows && !isAfterOverflows;
    if (isDisabledInside) {
      const [beforeHour, beforeMinutes] = [isBefore.hour(), isBefore.minute()];
      const [afterHour, afterMinutes] = [isAfter ? isAfter.hour() : 24, isAfter ? isAfter.minute() : 0];
      values.push(
        ...integerArraySuite(
          beforeMinutes > 0 ? beforeHour + 1 : beforeHour,
          afterMinutes >= 59 ? afterHour : afterHour - 1,
        ),
      );
      return values;
    }
    if (isAfter) {
      const [hour, minutes] = [isAfter.hour(), isAfter.minute()];
      values.push(...integerArraySuite(0, minutes >= 59 ? hour : hour - 1));
    }
    if (isBefore) {
      const [hour, minutes] = [isBefore.hour(), isBefore.minute()];
      values.push(...integerArraySuite(minutes > 0 ? hour + 1 : hour, 23));
    }
    return values;
  }, [isBefore, isBeforeOverflows, isAfter, isAfterOverflows, disabledHours]);
  const getDisabledHours = useCallback<NonNullable<PickerTimeProps['disabledHours']>>(
    () => lazyDisabledHours,
    [lazyDisabledHours],
  );
  const getDisabledMinutes = useCallback<NonNullable<PickerTimeProps['disabledMinutes']>>(
    (selectedHour) => {
      const values = disabledMinutes ? disabledMinutes(selectedHour) : [];
      if (isAfter) {
        const [hour, minutes] = [isAfter.hour(), isAfter.minute()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(0, minutes));
        }
      }
      if (isBefore) {
        const [hour, minutes] = [isBefore.hour(), isBefore.minute()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(minutes, 59));
        }
      }
      return values;
    },
    [isBefore, isAfter, disabledMinutes],
  );

  return (
    <InternalTimePicker
      onSelect={handleSelect}
      onChange={handleChange}
      onBlur={handleBlur}
      disabledHours={getDisabledHours}
      disabledMinutes={getDisabledMinutes}
      value={valueProp}
      format={format}
      {...applySizeProps('ant-picker', {size, className})}
      {...otherProps}
    />
  );
};
